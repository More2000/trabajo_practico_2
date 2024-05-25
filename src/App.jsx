//SOCKET IO [PARTE DEL CLIENTE]
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
// INICIALIZAMOS CON USESTATE AL SOCKET
const [getSocket, setSocket] = useState(null)
const [getMessages, setMessages] = useState([])


//LLAMAMOS UNA SOLA VEZ (useEffect) A -> SOCKET IO [CLIENTE]
useEffect(() => {
  // DEFINIMOS SOCKET Y LE INDICAMOS LA URL DEL BACK
  const socket = io('http://localhost:3000');
  // ¡SETEAMOS EL SOCKET!
  setSocket(socket);

  socket.on('message', (data) => {
    setMessages(i => [...i, data.message])
  })
}, []);

const handle = () => {
  // EL EMIT TIENE QUE COINCIDIR EXACTO CON LA PALABRA PUESTA EN EL BACK
  getSocket.emit("hola", {})
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
