// IMPORTAMOS MONGODB
import { MongoClient } from "mongodb";

// DEMÁS IMPORTACIONES
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';

// HABILITAMOS EL .ENV
import dotenv from 'dotenv';
dotenv.config();

// PROCESAMOS EL .ENV
const env = process.env;

// DEFINIMOS EL PUERTO
const PORT = env.PORT_SERVER;

// DEFINIMOS LA URI DE LA BASE DE DATOS
const uri = env.MONGODB_URI;

// LEVANTAMOS LA PÁGINA CON EXPRESS
const app = express();

// USAMOS CORS
app.use(cors());

// PARSEAMOS LOS JSON QUE USE LA APP
app.use(bodyParser.json());

// SETEAMOS LA BASE DE DATOS (MONGO)
const client = new MongoClient(
    uri);
// NOMBRE DE LA BASE DE DATOS [MONGODB]
const db = client.db('trabajo_práctico_2');

// NOMBRE DE LA COLECCIÓN [MONGODB]
const collection = db.collection('Redes y Comunicaciones');


// NOS CONECTAMOS A LA BASE DE DATOS

try {
  await client.connect();

}
catch(er) {
  console.log("ERROR AL CONECTAR A LA DB")
}


app.post('/temperatura', async (req, res) => {
  
    const { timestamp, temperatura } = req.body;

    try {
      // INSERTAMOS LOS DATOS EN LA DB (MONGODB)
      const nuevoDocumento = {
        timestamp: new Date(timestamp),
        temperatura: temperatura
      };

      await collection.insertOne(nuevoDocumento);
      res.status(200).send('DATOS AGREGADOS EN LA BASE DE DATOS');
      
    } catch (error) {
      console.error('DATOS NO AGREGADOS A LA BASE DE DATOS:', error);
      res.status(500).send('Error inserting data');
    }
});

app.get('/api/temperaturas', async (req, res) => {
    try {
      // OBTENEMOS TODAS LAS TEMPERATURAS DE LA DB (MONGODB)
      //const result = await collection.find({}).toArray();
      res.send("HOLAA")
      //res.status(200).json(result);
    } catch (error) {
      console.error('NO SE PUDO OBTENER TEMPERATURAS:', error);
      res.status(500).send('Error fetching data');
    }
});


app.listen(PORT, () => {
  console.log('Servidor corriendo en el puerto ' + PORT);
});
