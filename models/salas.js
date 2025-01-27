import mongoose from "mongoose";

const salaSchema=new mongoose.Schema({
    nombre:{type:String,required:true},
    capacidad:{type:Number,required:true},
    equipo:{type:String,required:true},
    foto:{type:String,required:true},
    estado:{type:Number,default:1},
})

export default mongoose.model("Sala",salaSchema)