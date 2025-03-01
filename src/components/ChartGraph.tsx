import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataPoint {
  month: string;
  users: number;
  subscribers: number;
}

interface UsersOverviewProps {
  data: DataPoint[];
}

export function ChartGraph({ data }: UsersOverviewProps) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        border: {
          display: false,
        },
        position: 'left' as const,
        beginAtZero: true,
        max: 3500,
        ticks: {
          font: {
            size: 14,
          },
        },
        grid: {
          color: '#f1f1f1',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#e5e7eb',
        borderWidth: 1,
        padding: 12,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toLocaleString()}`;
          }
        }
      }
    },
  };

  const chartData = {
    labels: data.map(d => d.month),
    datasets: [
      {
        label: 'Users',
        data: data.map(d => d.users),
        backgroundColor: '#ef4444',
        borderRadius: 6,
        barPercentage: 0.5,
        categoryPercentage: 0.4,
      },
      {
        label: 'Subscribers',
        data: data.map(d => d.subscribers),
        backgroundColor: '#ec4899',
        borderRadius: 6,
        barPercentage: 0.5,
        categoryPercentage: 0.4,
      },
    ],
  };

  return ( 
    <div className="bg-white p-4 md:p-8 rounded-3xl shadow-sm shadow-gray-400">
      <div className="space-y-6">
        <h1 className="text-2xl font-semibold">Users Overview</h1>
        <div className="flex gap-4">
          <div className="flex items-center gap-1 border border-gray-300 py-1 px-2 rounded-full">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className='font-semibold'>Users</span>
          </div>
          <div className="flex items-center gap-1 border border-gray-300 py-1 px-2 rounded-full">
            <div className="w-3 h-3 rounded-full bg-pink-500"></div>
            <span className='font-semibold'>Subscribers</span>
          </div>
        </div>
        <div className='h-250px md:h-[350px] pt-2'>
          <Bar options={options} data={chartData} />
        </div>
      </div>
    </div>
  );
}