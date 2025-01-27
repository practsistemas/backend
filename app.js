import  express  from "express"
import 'dotenv/config'
import dbConexion from "./database/cnxmongoose.js"
import cors from "cors"

import salas from "./routes/salas.js"
import roles from "./routes/roles.js"
import usuarios from "./routes/usuarios.js"
import reuniones from "./routes/reuniones.js"

const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/salas",salas)
app.use("/api/roles",roles)
app.use("/api/usuarios",usuarios)
app.use("/api/reuniones",reuniones)

app.listen(process.env.PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
    dbConexion()
})
