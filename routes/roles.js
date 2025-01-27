import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middleware/validar-campos.js';
import httpRoles from '../controllers/roles.js';
// import helpersSede from '../helpers/sedes.js'; 
// import {validarJWT } from '../middleware/validar-jwts.js'
// import { validarRol } from "../middleware/rolesPermisos.js";

const router = Router();

router.get("/obt",[
//   validarJWT,
//   validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpRoles.getRoles);

router.post("/agregar", [
//   validarJWT,
//   validarRol(["ADMINISTRADOR"]),
  check("nombre", "El nombre es requerido").notEmpty(),
], httpRoles.postRoles);

router.put("/actualizar/:id", [
    check("id").isMongoId(),
    check("nombre").optional().notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
], httpRoles.putRoles)


export default router;