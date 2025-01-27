import Reunion from "../models/reuniones.js";
import { format } from 'date-fns';

const httpReuniones = {
    getReuniones: async (req, res) => {
        try {
            const reuniones = await Reunion.find();
            res.json({ reuniones });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las reuniones" });
        }
    },
    getReunionesActivos: async (req, res) => {
        const reuniones = await Reunion.find({ estado: 1 });
        res.json({ reuniones });
    },
    getReunionesInactivos: async (req, res) => {
        const reuniones = await Reunion.find({ estado: 0 });
        res.json({ reuniones });
    },
    postReuniones: async (req, res) => {
        try {
            const { idusuario, idsala, fecha, horaInicio, horaFin, estado } = req.body;

            // Convertir las fechas utilizando solo el formato de `date-fns`
            const fechaInicio = new Date(`${fecha}T${horaInicio}`);
            const fechaFin = new Date(`${fecha}T${horaFin}`);

            if (isNaN(fechaInicio) || isNaN(fechaFin)) {
                return res.status(400).json({ error: "El formato de fecha u hora no es válido" });
            }

            if (fechaInicio >= fechaFin) {
                return res.status(400).json({ error: "La hora de inicio debe ser anterior a la hora de fin" });
            }

            // Comprobar conflictos en las reuniones para la sala
            const conflicto = await Reunion.findOne({
                idsala,
                fecha: new Date(fecha),
                $or: [
                    { horaInicio: { $lt: fechaFin }, horaFin: { $gt: fechaInicio } }
                ]
            });

            if (conflicto) {
                return res.status(400).json({ error: "Ya existe una reunión en este horario para esta sala" });
            }

            const reunion = new Reunion({
                idusuario,
                idsala,
                fecha: new Date(fecha),
                horaInicio: fechaInicio,
                horaFin: fechaFin,
                estado,
            });

            await reunion.save();
            res.json({ message: "Reunión creada satisfactoriamente", reunion });
        } catch (error) {
            res.status(500).json({ error: "Error al crear la reunión" });
        }
    },
    putReuniones: async (req, res) => {
        const { id } = req.params;
        const { ...resto } = req.body;
        const reunion = await Reunion.findByIdAndUpdate(id, resto, { new: true });
        res.json(reunion);
    },
    putReunionesActivar: async (req, res) => {
        const { id } = req.params;
        const reunion = await Reunion.findByIdAndUpdate(id, { estado: 1 }, { new: true });
        res.json({ reunion });
    },
    putReunionesDesactivar: async (req, res) => {
        const { id } = req.params;
        const reunion = await Reunion.findByIdAndUpdate(id, { estado: 0 }, { new: true });
        res.json({ reunion });
    },
    deleteReuniones: async (req, res) => {
        const { id } = req.params;
        try {
            const reunion = await Reunion.findByIdAndDelete(id);
            if (!reunion) {
                return res.status(404).json({ error: "Reunión no encontrada" });
            }
            res.json({ message: "Reunión eliminada correctamente", reunion });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error al eliminar la reunión" });
        }
    }
};

export default httpReuniones;
