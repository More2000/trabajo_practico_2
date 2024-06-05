// IMPORTACIONES 
import React, { useEffect, useState } from 'react';
import axios from 'axios';

// IMPORTACIONES DE REACT CHARTJS2
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// TRAEMOS EL VALOR DE TOKEN
import useToken from './Token';

const App = () => {
  // DECLARAMOS EL VALOR DEL TOKEN TRAIDO
  const token = useToken();

  // INICIALIZACIONES
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // CARGA DE DATOS
  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        try {
          // CONECTAMOS AL ENDPOINT DEL SERVER
          const response = await axios.get('http://localhost:7000/api/temperaturas', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setData(response.data);
          setLoading(false);
          console.log(response.data)
        } catch (error) {
          console.error('Error al traer temperaturas', error);
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [token]);

  // GRÁFICO
  const formatDataForChart = () => {
    const labels = data.map(entry => new Date(entry.timestamp).toLocaleString());
    const temperaturas = data.map(entry => entry.temperatura);

    return {
      labels,
      datasets: [
        {
          label: 'Temperatura a lo largo del tiempo',
          data: temperaturas,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };
  };

  // CONFIGURAMOS EL EJE Y COMO QUERAMOS
  const options = {
    scales: {
      y: {
        min: -5,
        max: 50,
        ticks: {
          stepSize: 5,
          reverse: true,
          callback: function(value) {
            return value;
          }
        }
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="App">
      <h1>Temperaturas</h1>
      <Line data={formatDataForChart()} options={options} />
    </div>
  );
};

export default App;
