// routes/reuniones.js

import express from 'express';
import { crearReunion, obtenerAuthUrl, obtenerToken } from '../controllers/reuniones.js';

const router = express.Router();

// Ruta para obtener la URL de autorización
router.get('/auth', obtenerAuthUrl);

// Ruta para intercambiar el código por un token
router.post('/auth/callback', obtenerToken);

// Ruta para crear el evento en Google Calendar
router.post('/crear', crearReunion);

export default router;
