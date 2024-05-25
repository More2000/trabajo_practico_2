// IMPORTAMOS SOCKET.IO
const socketIo = require('socket.io');

// IMPORTAMOS MONGODB
const { MongoClient } = require("mongodb");

// DEMÁS IMPORTACIONES
const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');
const cors = require('cors');
const http = require('http');
const axios = require('axios');

// HABILITAMOS EL .ENV
require('dotenv').config();

// PROCESAMOS EL .ENV
const env = process.env;

// DEFINIMOS EL PUERTO
const PORT = env.PORT_SERVER;

// DEFINIMOS LA URI DE LA BASE DE DATOS
const uri = process.env.MONGODB_URI;

// LEVANTAMOS LA PÁGINA CON EXPRESS
const app = express();

// USAMOS CORS
app.use(cors());

// PARSEAMOS LOS JSON QUE USE LA APP
app.use(bodyParser.json());

// SERVER =  DEFINIMOS SERVER A PARTIR DE EXPRESS
const server = http.createServer(app);

const io = socketIo(server);

// SETEAMOS LA BASE DE DATOS (MONGO)
const client = new MongoClient(
    uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true 
    });
    
// NOS CONECTAMOS A LA BASE DE DATOS
await client.connect();

// NOMBRE DE LA BASE DE DATOS [MONGODB]
const db = client.db('trabajo_práctico_2');

// NOMBRE DE LA COLECCIÓN [MONGODB]
const collection = db.collection('Redes y Comunicaciones');

// ENVIAMOS LA TEMPERATURA
io.on('connection', (socket) => {
  // PALABRA CLAVE DEL EMIT = TEMPERATURA
  socket.on('temperatura', async (data) => {
    try {
      // ENVIAMOS LOS DATOS AL WEBHOOK
      await axios.post('http://localhost:3000/webhook', data);
    } catch (error) {
      console.error('No se pudo enviar data al webhook:', error);
    }
  });
});

app.post('/webhook', async (req, res) => {
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
      const result = await collection.find({}).toArray();
      res.status(200).json(result);
    } catch (error) {
      console.error('NO SE PUDO OBTENER TEMPERATURAS:', error);
      res.status(500).send('Error fetching data');
    }
});


server.listen(PORT_SERVER, () => {
  console.log('Servidor corriendo en el puerto ' + PORT_SERVER);
});
