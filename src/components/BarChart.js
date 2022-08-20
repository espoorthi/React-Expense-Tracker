import React from "react";
import { Bar } from "react-chartjs-2";
import chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import {optionsDark,optionsLight} from './LineChart';

chart.register(CategoryScale);

function StatisticsMoneyChart({ types, typesAmount,mode }) {
  const data = {
    labels: types,
    datasets: [
      {
        label: "Money Spent",
        data: typesAmount,
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(255, 159, 64 )",
          "rgba(255, 205, 86 )",
          "rgba(75, 192, 192 )",
          "rgba(54, 162, 235 )",
        ],
      },
    ],
  };
  return <Bar data={data} options={mode ? optionsDark:optionsLight} />;
}

export default StatisticsMoneyChart;
