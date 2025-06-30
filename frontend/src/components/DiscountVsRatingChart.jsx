import React from 'react'
import {Bar, Line} from 'react-chartjs-2'
import { Box, Paper, Typography } from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const roundToStep = (value, step = 0.1) => {
  return Math.round(value / step) * step
}

export default function DiscountVsRatingChart({ products }) {
  const ratingMap = {}

  products.forEach(p => {
    const rating = roundToStep(p.rating || 0, 0.1)
    const discount = Math.max(0, p.price - p.discount_price)

    if (!ratingMap[rating]) {
      ratingMap[rating] = []
    }
    ratingMap[rating].push(discount)
  })

  const sortedRatings = Object.keys(ratingMap)
    .map(Number)
    .sort((a, b) => a - b)

  const averageDiscounts = sortedRatings.map(rating => {
    const discounts = ratingMap[rating]
    const avg = discounts.reduce((acc, d) => acc + d, 0) / discounts.length
    return Math.round(avg)
  })

  const data = {
    labels: sortedRatings.map(r => r.toFixed(1)),  // строки '3.0', '3.1' и т.п.
    datasets: [
      {
        label: 'Средняя скидка (₽)',
        data: averageDiscounts,
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.4)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        spanGaps: true
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: '📈 Средняя скидка в зависимости от рейтинга (шаг 0.1)'
      },
      tooltip: {
        callbacks: {
          label: ctx => `Ср. скидка: ${ctx.raw}₽`
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Рейтинг товара'
        },
        ticks: {
          autoSkip: true,
          maxRotation: 0,
        }
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Скидка (₽)'
        }
      }
    }
  }

  return (
  <Paper elevation={3} sx={{ p: 6, mt: 6 }}>
    <Box sx={{ width: 450, height: 450 }}>
      <Line data={data} options={options} />
    </Box>
  </Paper>
  )}