export default class Socket {
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