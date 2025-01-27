import mongoose from "mongoose";

const usuarioSchema=new mongoose.Schema({
    nombre:{type:String,required:true},
    correo:{type:String,required:true},
    contrasena:{type:String,required:true},
    telefono:{type:String,required:true},
    idrol:{type:mongoose.Schema.Types.ObjectId,required:true,ref:"Rol"},
    estado:{type:Number,default:1},
})

export default mongoose.model("Usuario",usuarioSchema)