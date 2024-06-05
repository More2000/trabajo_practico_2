import { useEffect, useState } from 'react';
import axios from "axios";
const Token = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    axios.post('http://localhost:7000/token', { username: 'admin', password: 'admin' })
        .then(response => {
        const token = response.data;
        setToken(token);
        })
        .catch(error => {
        console.error('Error:', error);
        });
  }, []);

  return token;
}

export default Token;
