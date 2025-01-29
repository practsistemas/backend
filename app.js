import express from "express";
import 'dotenv/config';
import dbConexion from "./database/cnxmongoose.js";
import cors from "cors";
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Rutas importadas
import salas from "./routes/salas.js";
import roles from "./routes/roles.js";
import usuarios from "./routes/usuarios.js";
import reuniones from "./routes/reuniones.js";

const app = express();
app.use(express.json());
app.use(cors());

const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID, 
    process.env.GOOGLE_CLIENT_SECRET, 
    process.env.GOOGLE_REDIRECT_URI 
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

const getAuthUrl = () => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });
    return authUrl;
};

const getAccessToken = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};

const createEvent = async (eventData) => {
    try {
        const response = await calendar.events.insert({
            calendarId: 'primary', // Para crear en el calendario principal
            resource: eventData,
        });
        return response.data;
    } catch (error) {
        console.error('Error creando evento:', error);
        throw error;
    }
};

// Rutas de la API
app.use("/api/salas", salas);
app.use("/api/roles", roles);
app.use("/api/usuarios", usuarios);
app.use("/api/reuniones", reuniones);

// Ruta para obtener la URL de autorización de Google
app.get('/api/reuniones/auth', (req, res) => {
    const authUrl = getAuthUrl();
    res.send({ authUrl });
});

// Ruta para intercambiar el código de autorización por un token
app.post('/api/reuniones/auth/callback', async (req, res) => {
    try {
        const { code } = req.body;
        const tokens = await getAccessToken(code);
        res.send({ tokens });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener el token de acceso' });
    }
});

// Ruta para crear un evento en Google Calendar
app.post('/api/reuniones/crear', async (req, res) => {
    const { title, description, startDateTime, endDateTime } = req.body;

    const eventData = {
        summary: title,
        description: description,
        start: {
            dateTime: startDateTime,
            timeZone: 'America/Los_Angeles', // Ajusta a tu zona horaria
        },
        end: {
            dateTime: endDateTime,
            timeZone: 'America/Los_Angeles',
        },
        attendees: [{ email: 'user@example.com' }], // Puedes agregar el correo de los participantes
    };

    try {
        const event = await createEvent(eventData);
        res.send({ event });
    } catch (error) {
        res.status(500).send({ error: 'Error al crear el evento en Google Calendar' });
    }
});

// Servidor escucha
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    dbConexion();
});
process.noDeprecation = true;

