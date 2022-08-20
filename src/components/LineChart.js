import React from "react";
import { Line } from "react-chartjs-2";
import chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

chart.register(CategoryScale);

// const chartAreaBorder = {
//   id: "chartAreaBorder",
//   beforeDraw(chart, args, options) {
//     const {
//       ctx,
//       chartArea: { left, top, width, height },
//     } = chart;
//     ctx.save();
//     ctx.strokeStyle = options.borderColor;
//     ctx.lineWidth = options.borderWidth;
//     ctx.setLineDash(options.borderDash || []);
//     ctx.lineDashOffset = options.borderDashOffset;
//     ctx.strokeRect(left, top, width, height);
//     ctx.restore();
//   },
// };
export const optionsDark = {
  color: "#fff",
  
  scales: {
    xdescribe: {
      grid: {
        borderColor:'#a8a8a8',
      },
      ticks: {
        color: "#fff",
        beginAtZero: true,
      },
    },
    ydescribe: {
      grid: {
        color: "rgba(255, 255, 255,.1)",
        borderColor:'#a8a8a8',
      
      },
      ticks: {
        color: "#fff",
        beginAtZero: true,
      },
    },
  },
};

export const optionsLight = {
  color:'#000',
  scales: {
    xdescribe: {
    
      ticks: {
        beginAtZero: true,
      },
    },
    ydescribe: {       
      ticks: {
        beginAtZero: true,
      },
    },
  },
};


function LineChart({ dates, moneySpent,mode }) {

  const data = {
    labels: dates,
    datasets: [
      {
        label: "Spent Money Timeline",
        data: moneySpent,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "#0071bd",
        tension: 0,
      },
    ],
  };

  return (
    <Line
      data={data}
      options={mode ? optionsDark : optionsLight}
    />
  );
}

export default LineChart;
