import Rol from "../models/roles.js";

const httpRoles = {
    getRoles: async (req, res) => {
        try {
            const roles = await Rol.find()
            res.json({ roles });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los roles" });
        }
    },
    postRoles: async (req, res) => {
        try {
            const { nombre } = req.body;
            const rol = new Rol({ nombre, permisos: [] }); // Inicializa permisos como un array vacío
            await rol.save();
            res.json({ message: "Rol creado satisfactoriamente", rol });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "No se pudo crear el rol" });
        }
    },
    putRoles:async (req, res) => {
        const {id} = req.params;
        const { ...resto} = req.body;
        const rol = await Rol.findByIdAndUpdate(id, resto, {new: true});
        res.json(rol)
    },
}

export default httpRoles