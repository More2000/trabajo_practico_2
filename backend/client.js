//

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
const PORT = env.PORT_CLIENT;
const URL = env.URL_SOCKET;

// LEVANTAMOS LA PÁGINA CON EXPRESS
const app = express();

app.listen(PORT, () => {
    console.log('Servidor corriendo en el puerto ' + PORT);
    const socket = new Socket(URL)

    socket.on(`connection`, () => {
        setInterval ( () => {
            // CREA UNA TEMPERATURA ALEATORIA Y LA REDONDEA
            const temperatura = (Math.random() * (35.0 - 15.0) + 15.0).toFixed(1);
    
            // OBTIENE LA HORA DEL MOMENTO
            const timestamp = Math.floor(Date.now() / 1000);
        
            // JUNTA LAS DOS VARIABLES Y LA JUNTA EN DATA
            const data = { timestamp, temperatura };
        
            // PALABRA CLAVE DEL EMIT = TEMPERATURA
            socket.emit('temperatura', data);
  },5000)
        console.log("SE CONECTÓ A SOCKET")
    })
  });

   class Socket {
    socket = null;
    callbacks = {}

    constructor(url, params = {}) {
        
        const send_params = new URLSearchParams(params);

        this.socket = new WebSocket(`${url}/socket.feli?${send_params.toString()}`);
        

        this.socket.onmessage = (event) => {
            const { nombre, params } = JSON.parse(event.data);
            if(this.callbacks[nombre]) {
                this.callbacks[nombre].forEach(callback => callback(params));
            }
        };


        this.socket.onopen = () => {
            if(this.callbacks["connection"]) {
                this.callbacks["connection"].forEach(callback => callback());
            }
        };

        this.socket.onerror = (error) => {
            if(this.callbacks["error"]) {
                this.callbacks["error"].forEach(callback => callback(error));
            }
          };
    }

    emit(nombre, params = {}) {
        if(this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify({nombre, params}))
        }
    }

    on(mensaje, callback) {
        if(!this.callbacks[mensaje]) {
            this.callbacks[mensaje] = [];
        }
        this.callbacks[mensaje].push(callback);
    }
}