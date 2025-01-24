import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js'

const CryptoChart = ({ data }) => {
  return (
    <Line
      data={{
        labels: data.map((item) => item.date),
        datasets: [
          {
            label: "Price (USD)",
            data: data.map((item) => item.price),
            borderColor: "rgba(75,192,192,1)",
            fill: false,
          },
        ],
      }}
    />
  );
};
ChartJS.register(...registerables);


export default CryptoChart;
