// DEMÁS IMPORTACIONES
const express = require('express');
const http = require('http');
const path = require('path');
const dotenv = require('dotenv');

// HABILITAMOS EL .ENV
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });
const PORT = process.env.PORT_GENERATOR;

// LEVANTAMOS CON EXPRESS
const app = express();

// LEVANTAMOS EL SERVER
const server = http.createServer(app);

socket.on('connect', () => {
  setIntervalo(() => {
    // CREA UNA TEMPERATURA ALEATORIA Y LA REDONDEA
    const temperatura = (Math.random() * (35.0 - 15.0) + 15.0).toFixed(1);

    // OBTIENE LA HORA DEL MOMENTO
    const timestamp = Math.floor(Date.now() / 1000);

    // JUNTA LAS DOS VARIABLES Y LA JUNTA EN DATA
    const data = { timestamp, temperatura };

    // PALABRA CLAVE DEL EMIT = TEMPERATURA
    socket.emit('temperatura', data);
    
  }, 5000);
});

server.listen(PORT, () => {
  console.log(`Microservicio corriendo en http://localhost:${PORT}`);
});
