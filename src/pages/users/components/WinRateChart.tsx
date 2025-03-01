// WinRateChart.js
import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

interface WinRateChartProps {
  winRates: { date: string; winRate: number }[];
  overallWinRate: string;
  chartId?: string;
}

const WinRateChart: React.FC<WinRateChartProps> = ({ winRates, overallWinRate, chartId = "win-rate-chart" }) => {
  const chartRef = useRef<Chart | null>(null);

  const chartData = {
    labels: winRates.map((item) => item.date),
    datasets: [
      {
        label: "Win Rate",
        data: winRates.map((item) => item.winRate),
        borderColor: "red",
        backgroundColor: "#ff000072",
        fill:true,
        tension: 0, // Set tension to 0 for a sharp line
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { ticks: { color: "black" } },
      y: { ticks: { color: "black" } },
    },
    plugins: {
      legend: { display: false },
    },
  };


  return (
    <div className="bg-[white] text-black shadow shadow-gray-400 p-4 rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Win Rate</h2>
        <span className="text-yellow-400 font-bold">{overallWinRate}</span>
      </div>
      <div className="h-60">
        <Line ref={chartRef} data={chartData} options={chartOptions} id={chartId} />
      </div>
    </div>
  );
};

export default WinRateChart;