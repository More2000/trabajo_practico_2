// IMPORTACIONES
import express from 'express';
import cors from "cors"

// HABILITAMOS EL .ENV
import * as dotenv from "dotenv"
dotenv.config();

// PROCESAMOS EL .ENV
const env = process.env;

// DEFINIMOS EL PUERTO
const PORT = env.PORT_INDEX;

// LEVANTAMOS LA PÁGINA CON EXPRESS
const app = express();

//USAMOS CORS
app.use(cors());

app.listen(PORT, () => {
    console.log('Index corriendo en el puerto ' + PORT);
});