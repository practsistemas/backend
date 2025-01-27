import Usuario from "../models/usuarios.js";
import bcryptjs from "bcryptjs"
import { generarJWT } from '../middleware/validar-jwts.js'
// import { sendEmail } from "../middleware/email.js";

const httpUsuarios = {
    getUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.find()
            res.json({ usuarios });
        } catch (error) {
            res.status(500).json({ error: "Error al obtener los Usuarios" });
        }
    },
    getUsuariosActivos: async (req, res) => {
        const usuarios = await Usuario.find({estado: 1})
        res.json({ usuarios })
    },
    getUsuariosInactivos: async (req, res) => {
        const usuarios = await Usuario.find({estado: 0})
        res.json({ usuarios })
    },
    // postUsuarios: async (req, res) => {
    //     try {
    //         const {nombre,correo,contrasena,telefono,idrol}=req.body;
    //         const usuario = new Usuario({nombre,correo,contrasena,telefono,idrol});
    //         await usuario.save()
    //         console.log(usuario);
    //         res.json({ message: "Usuario creado satisfactoriamente", usuario });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(400).json({ err: "No se pudo crear el Usuario" })
    //     }
    // },
    postUsuarios: async (req, res) => {
        try {
            const {nombre,correo,contrasena,telefono,idrol} = req.body
            const salt = bcryptjs.genSaltSync(10);
            const usuario = new Usuario({nombre,correo,contrasena,telefono,idrol});
            usuario.contrasena = bcryptjs.hashSync(contrasena, salt)
            await usuario.save()
            console.log(usuario);
            res.json({ message: "Usuario creado satisfactoriamente", usuario });
        } catch (error) {
            console.log(error);
            res.status(400).json({ err: "No se pudo crear el usuario" })
        }

    },
    putUsuarios:async (req, res) => {
        const {id} = req.params;
        const { ...resto} = req.body;
        const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true});
        res.json(usuario)
    },
    putUsuariosActivar:async (req,res) => {
        const {id} = req.params
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 1 }, { new: true })
        res.json({ usuario })
    },
    putUsuariosDesactivar:async (req,res) => {
        const { id } = req.params
        const usuario = await Usuario.findByIdAndUpdate(id, { estado: 0 }, { new: true })
        res.json({ usuario })
    },
    login: async (req, res) => {
        const { correo, contrasena } = req.body;
        try {
            const usuario = await Usuario.findOne({ correo })
            if (!usuario) {
                return res.status(401).json({
                    // msg: "Usuario / Password no son correctos+"
                    msg: "Correo"
                })
            }

            const validPassword = bcryptjs.compareSync(contrasena, usuario.contrasena);
            if (!validPassword) {
                return res.status(401).json({
                    // msg: "Usuario / Password no son correctos"
                    msg: "Contraseña"
                })
            }


            const token = await generarJWT(usuario._id);
            res.json({
                usuario,
                token
            })

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
    },
}

export default httpUsuarios