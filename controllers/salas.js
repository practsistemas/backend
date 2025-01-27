import Salas from "../models/salas.js";

const httpSalas = {
    getSalas: async (req, res) => {
        try {
            const salas = await Salas.find()
            res.json({ salas });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener las salas" });
        }
    },
    getSalasActivos: async (req, res) => {
        const salas = await Salas.find({estado: 1})
        res.json({ salas })
    },
    getSalasInactivos: async (req, res) => {
        const salas = await Salas.find({estado: 0})
        res.json({ salas })
    },
    postSalas: async (req, res) => {
        try {
            const {nombre,capacidad,equipo,foto}=req.body;
            const sala = new Salas({nombre,capacidad,equipo,foto});
            await sala.save()
            console.log(sala);
            res.json({ message: "Sala creada satisfactoriamente", sala });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear la sala" })
        }
    },
    putSalas:async (req, res) => {
        const {id} = req.params;
        const { ...resto} = req.body;
        const sala = await Salas.findByIdAndUpdate(id, resto, {new: true});
        res.json(sala)
    },
    putSalasActivar:async (req,res) => {
        const {id} = req.params
        const sala = await Salas.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ sala })
    },
    putSalasDesactivar:async (req,res) => {
        const { id } = req.params
        const sala = await Salas.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ sala })
    }
}

export default httpSalas