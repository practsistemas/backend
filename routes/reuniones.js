import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middleware/validar-campos.js';
import httpReuniones from '../controllers/reuniones.js';
// import helpersSede from '../helpers/sedes.js'; 
// import {validarJWT } from '../middleware/validar-jwts.js'
// import { validarRol } from "../middleware/rolesPermisos.js";

const router = Router();

router.get("/obt",[
//   validarJWT,
//   validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpReuniones.getReuniones);

router.get("/obt/activos",[
  // validarJWT,
  // validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpReuniones.getReunionesActivos);

router.get("/obt/inactivos",[
  // validarJWT,
  // validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpReuniones.getReunionesInactivos);


router.post("/agregar", [
//   validarJWT,
//   validarRol(["ADMINISTRADOR"]),
  check("idusuario", "ID de rol invalido").isMongoId(),
  check("idsala", "ID de rol invalido").isMongoId(),
  check("fecha", "La fecha es requerida").notEmpty(),
  check("horaInicio", "La hora de inicio es requerida").notEmpty(),
  check("horaFin", "La hora de fin es requerida").notEmpty(),
  validarCampos,
], httpReuniones.postReuniones);

router.put("/actualizar/:id", [
  // validarJWT,
  // validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
  validarCampos,
], httpReuniones.putReuniones);

router.put("/activar/:id", [
  // validarJWT,
  // validarRol(["ADMIN"]),
  validarCampos,
], httpReuniones.putReunionesActivar);
router.put("/desactivar/:id", [
  // validarJWT,
  // validarRol(["ADMIN"]),
  validarCampos,
], httpReuniones.putReunionesDesactivar);

router.delete('/delete/:id', [
  // validarJWT,
  //validarRol(["ADMIN","USER"]),
], httpReuniones.deleteReuniones);

export default router;