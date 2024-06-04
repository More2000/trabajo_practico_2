import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://your-api-endpoint.com/api/temperatures');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDataForChart = () => {
    const labels = data.map(entry => new Date(entry.timestamp).toLocaleString());
    const temperatures = data.map(entry => entry.temperature);

    return {
      labels,
      datasets: [
        {
          label: 'Temperature over Time',
          data: temperatures,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    };
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <h1>Temperature Data</h1>
      <Line data={formatDataForChart()} />
    </div>
  );
};

export default App;
