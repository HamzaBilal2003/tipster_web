import React, { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";

interface WinRateChartProps {
  winRates: { month: string; winRate: number }[];
  overallWinRate: string;
  chartId?: string;
}

const WinRateChart: React.FC<WinRateChartProps> = ({ winRates, overallWinRate, chartId = "win-rate-chart" }) => {
  const chartContainer = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy previous chart instance
    }

    if (chartContainer.current) {
      chartInstance.current = new Chart(chartContainer.current, {
        type: "line",
        data: {
          labels: winRates.map((item) => item.month),
          datasets: [
            {
              label: "Win Rate",
              data: winRates.map((item) => item.winRate),
              borderColor: "red",
              backgroundColor: "#ff000072",
              fill: true,
              tension: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: { ticks: { color: "black" } },
            y: { ticks: { color: "black" } },
          },
          plugins: {
            legend: { display: false },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [winRates]);

  return (
    <div className="bg-[white] text-black shadow shadow-gray-400 p-4 rounded-lg w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Win Rate</h2>
        <span className="text-yellow-400 font-bold">{overallWinRate}</span>
      </div>
      <div className="h-60">
        <canvas ref={chartContainer} id={chartId} />
      </div>
    </div>
  );
};

export default WinRateChart;
