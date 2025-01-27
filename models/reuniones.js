import mongoose from "mongoose";

const reunionSchema = new mongoose.Schema({
    idusuario:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Usuario"},
    idsala:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Sala"},
    fecha: { type: Date, required: true },
    horaInicio: { type: Date, required: true },
    horaFin: { type: Date, required: true },
    estado: { type: Number, default: 1 },
});

export default mongoose.model("Reunion", reunionSchema);
