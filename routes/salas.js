import { Router } from 'express';
import { check } from 'express-validator';
import { validarCampos } from '../middleware/validar-campos.js';
import httpSalas from '../controllers/salas.js';
// import helpersSede from '../helpers/sedes.js'; 
// import {validarJWT } from '../middleware/validar-jwts.js'
// import { validarRol } from "../middleware/rolesPermisos.js";

const router = Router();

router.get("/obt",[
//   validarJWT,
//   validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpSalas.getSalas);

router.get("/obt/activos",[
  // validarJWT,
  // validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpSalas.getSalasActivos);

router.get("/obt/inactivos",[
  // validarJWT,
  // validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
], httpSalas.getSalasInactivos);


router.post("/agregar", [
//   validarJWT,
//   validarRol(["ADMINISTRADOR"]),
  check("nombre", "El nombre es requerido").notEmpty(),
  check("capacidad", "La capacidad es requerida").notEmpty(),
  check("equipo", "El equipo es requerida").notEmpty(),
  check("foto", "La foto es requerida").notEmpty(),
  validarCampos,
], httpSalas.postSalas);

router.put("/actualizar/:id", [
  // validarJWT,
  // validarRol(["ADMINISTRADOR","RECEPCIONISTA"]),
  check("id", "ID de sala invalido").isMongoId(),
  check("nombre", "El nombre es requerido").optional().notEmpty(),
  check("capacidad", "La capacidad es requerida").notEmpty(),
  check("equipo", "El equipo es requerida").notEmpty(),
  check("foto", "La foto es requerida").notEmpty(),
  validarCampos,
], httpSalas.putSalas);

router.put("/activar/:id", [
  // validarJWT,
  // validarRol(["ADMIN"]),
  validarCampos,
], httpSalas.putSalasActivar);
router.put("/desactivar/:id", [
  // validarJWT,
  // validarRol(["ADMIN"]),
  validarCampos,
], httpSalas.putSalasDesactivar);

export default router;