// IMPORTACIONES
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import express from 'express';
import cors from "cors"

// HABILITAMOS EL .ENV
require('dotenv').config();

// PROCESAMOS EL .ENV
const env = process.env;

// DEFINIMOS EL PUERTO
const PORT = env.PORT_INDEX;

// LEVANTAMOS LA PÁGINA CON EXPRESS
const app = express();

//USAMOS CORS
app.use(cors());


// SERVER =  DEFINIMOS SERVER A PARTIR DE EXPRESS
const server = createServer(app);

// CREAMOS EL SERVER 
const io = new Server(server, {
    connectionStateRecovery: {},
    //ARREGLAMOS CORS
    cors: {
        origin: "*"
      }
});

// IO.ON ("CONNECTION") = ACÁ PODEMOS REALIZAR ACCIONES A PARTIR DE LA CONEXIÓN CON EL SERVER
io.on("connection", (socket) => {
    console.log("Conexion exitosa")
    // UNA VEZ CONECTADO, 
    socket.on("hola", () => {
        io.emit("message", {message: "puto"})
      console.log("Hola")
    })
});

server.listen(PORT_INDEX, () => {
    console.log('Index corriendo en el puerto ' + PORT_INDEX);
});