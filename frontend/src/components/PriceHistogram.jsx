import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Box, Paper, Typography } from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PriceHistogram = ({ products = [] }) => {
  if (!Array.isArray(products)) {
    console.warn('⚠️ products не является массивом в <PriceHistogram>', products)
    return null
  }

  const bins = [0, 5000, 10000, 20000, 30000, 50000, 100000]
  const binLabels = bins.slice(0, -1).map((_, i) => `${bins[i]} – ${bins[i + 1]}₽`)

  const binCounts = bins.slice(0, -1).map((_, i) => {
    const min = bins[i]
    const max = bins[i + 1]
    return products.filter((p) => p.price >= min && p.price < max).length
  })

  const data = {
    labels: binLabels,
    datasets: [
      {
        label: 'Количество товаров',
        data: binCounts,
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => `Товаров: ${context.raw}`
        }
      },
      title: {
        display: true,
        text: '📊 Распределение товаров по цене'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Количество товаров'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Диапазон цен (₽)'
        }
      }
    }
  }

  return (
  <Paper elevation={3} sx={{ p: 6, mt: 6 }}>
    <Box sx={{ width: 450, height: 450 }}>
      <Bar data={data} options={options} />
    </Box>
  </Paper>
  )}

export default PriceHistogram