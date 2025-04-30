import express from "express";
import 'dotenv/config';
import dbConexion from "./database/cnxmongoose.js";
import cors from "cors";


// Rutas importadas
import salas from "./routes/salas.js";

const app = express();
app.use(express.json());
app.use(cors());


// Rutas de la API
app.use("/api/salas", salas);





// Servidor escucha
app.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    dbConexion();
});
process.noDeprecation = true;

