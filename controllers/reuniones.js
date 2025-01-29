// controllers/reunionesController.js

import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Instanciamos OAuth2Client
const oauth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID, 
    process.env.GOOGLE_CLIENT_SECRET, 
    process.env.GOOGLE_REDIRECT_URI 
);

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Función para crear el evento
export const crearReunion = async (req, res) => {
    const { title, description, startDateTime, endDateTime, attendees } = req.body;

    const eventData = {
        summary: title,
        description: description,
        start: {
            dateTime: startDateTime,
            timeZone: 'America/Bogota', // Zona horaria de Bogotá
        },
        end: {
            dateTime: endDateTime,
            timeZone: 'America/Bogota',
        },
        attendees: attendees.map(email => ({ email })), // Lista dinámica de asistentes
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary', // Crear en el calendario principal
            resource: eventData,
        });
        res.status(200).send({ event: response.data });
    } catch (error) {
        console.error('Error creando evento:', error);
        res.status(500).send({ error: 'Error al crear el evento en Google Calendar' });
    }
};

// Función para obtener la URL de autorización
export const obtenerAuthUrl = (req, res) => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar'],
    });
    res.send({ authUrl });
};

// Función para obtener el token de acceso
export const obtenerToken = async (req, res) => {
    try {
        const { code } = req.body;
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        res.send({ tokens });
    } catch (error) {
        res.status(500).send({ error: 'Error al obtener el token de acceso' });
    }
};
