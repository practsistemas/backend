import mongoose from "mongoose";

const permisoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },  
});

export default mongoose.model("Permiso", permisoSchema);
