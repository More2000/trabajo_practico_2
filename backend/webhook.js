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
const PORT = env.PORT_WEBHOOK;
const URL_SERVER = env.URL_SERVER;

// LEVANTAMOS LA PÁGINA CON EXPRESS
const app = express();

app.post('/webhook', async (req, res) => {

    const { timestamp, temperatura } = req.body;

    // PASAMOS LOS VALORES DE DE ARRIBA AL ENDPOINT TEMPERATURA DE SERVER.JS
    try {
        const response = await axios.post(`${URL_SERVER}temperatura`, {
            timestamp,
            temperatura,
        })
        res.send(response.data);
    } catch (error) {
      console.error('DATOS NO AGREGADOS A LA BASE DE DATOS:', error);
      res.status(500).send('Error inserting data');
    }
});


app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ' + PORT);
  });
  