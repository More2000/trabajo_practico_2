// IMPORTAMOS EL SOCKET DE FELI
import Socket from "./components/Socket";
import { useEffect, useState } from "react";

function App() {
// INICIALIZAMOS CON USESTATE AL SOCKET
const [getSocket, setSocket] = useState(null)
const [getMessages, setMessages] = useState([])


//LLAMAMOS UNA SOLA VEZ (useEffect) A -> SOCKET.FELI
useEffect(() => {
  // DEFINIMOS SOCKET Y LE INDICAMOS LA URL DEL BACK
  const socket = new Socket('ws://localhost:8000',{userid: 1});

  socket.on('connection', (socket) => {
    console.log("CONEE")
  })
  socket.on('respuesta', (socket) => {
    console.log("ress")
  })

  // ¡SETEAMOS EL SOCKET!
  setSocket(socket);
}, []);

const handle = () => {
  // EL EMIT TIENE QUE COINCIDIR EXACTO CON LA PALABRA PUESTA EN EL BACK
  getSocket.emit("saludo", {nombre:'Felii'})
}

  return (
    <>
    {
      getMessages.map((value, index) => <div key={index}>{value}</div>)
    }
      <button onClick={handle}>XD</button>
    </>
  )
}

export default App
