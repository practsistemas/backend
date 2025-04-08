import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middleware/validar-campos.js';
import httpUsuarios from '../controllers/usuarios.js';
// import helpersSede from '../helpers/sedes.js'; 
// import {validarJWT } from '../middleware/validar-jwts.js'
// import { validarRol } from "../middleware/rolesPermisos.js";

const router = Router();

router.get("/obt",[
//   validarJWT,
//   validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpUsuarios.getUsuarios);

router.get("/obt/activos",[
  // validarJWT,
  // validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpUsuarios.getUsuariosActivos);

router.get("/obt/inactivos",[
  // validarJWT,
  // validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpUsuarios.getUsuariosInactivos);


router.post("/agregar", [
  check("nombre", "El nombre es requerido").notEmpty(),
  check("correo", "El correo es requerido").notEmpty(),
  check("contrasena", "El contrasena es requerido").notEmpty(),
  check("telefono", "El telefono es requerido").notEmpty(),
  check("rol", "rol invalido").notEmpty(),
  validarCampos,
], httpUsuarios.postUsuarios);

router.put("/actualizar/:id", [
  check("nombre", "El nombre es requerido").optional().notEmpty(),
  validarCampos,
], httpUsuarios.putUsuarios);

router.put("/activar/:id", [
  // validarJWT,
  // validarRol(["ADMIN"]),
  validarCampos,
], httpUsuarios.putUsuariosActivar);
router.put("/desactivar/:id", [
  // validarJWT,
  // validarRol(["ADMIN"]),
  validarCampos,
], httpUsuarios.putUsuariosDesactivar);

router.post("/login",
  [
    check("correo", "El correo es requerido").optional().notEmpty(),
    check("correo", "Formato de correo electronico invalido").isEmail(),
    check("contrasena", "La contrasena es requerida").optional().notEmpty(),
    validarCampos
  ],httpUsuarios.login)

export default router;