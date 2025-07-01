import React from 'react'
import { Box, Slider, Typography, TextField } from "@mui/material"

export default function Filters({ filters, setFilters }) {

  const handleSliderChange = (name) => (e, val) => {
    setFilters(prev => ({ ...prev, [name]: val }))
  }

  const handleInputChange = (name) => (e) => {
  let value = e.target.value

  if (value < 0) {
    value = 0
  }

  if (value === '') {
      setFilters(prev => ({ ...prev, [name]: '' }));
      return;
    }


  setFilters((prev) => ({
    ...prev,
      [name]: value
  }))
  };

  return (
    <Box p={2} sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>

      <Box sx={{ width: 250 }}>
          <Typography gutterBottom>Цена (мин–макс), ₽</Typography>
          <Slider
              getAriaLabel={() => 'Цена'}
              value={[filters.min_price || 0, filters.max_price || 100000]}
              step={1000}
              min={0}
              max={100000}
              onChange={(e, val) => {
                  setFilters((prev) => ({
                      ...prev,
                      min_price: val[0],
                      max_price: val[1],
                  }))
              }}
              valueLabelDisplay="auto"
          />
          <Typography variant="body2" sx={{ mt: 1 }}>
              От: {filters.min_price?.toLocaleString() || 0}₽ — До: {filters.max_price?.toLocaleString() || 100_000}₽
          </Typography>
      </Box>

      <Box sx={{ width: 150 }}>
        <Typography gutterBottom>Мин. рейтинг</Typography>
        <TextField
          type="number"
          inputProps={{ step: 0.1, min: 0, max: 5 }}
          value={filters.min_rating || ''}
          onChange={handleInputChange('min_rating', 0, 5)}
          helperText="Допустимо значение от 0 до 5 с шагом 0.1"
        />
      </Box>

      <Box sx={{ width: 150 }}>
        <Typography gutterBottom>Мин. отзывы</Typography>
        <TextField
          type="number"
          inputProps={{ min: 0 }}
          value={filters.min_reviews || ''}
          onChange={handleInputChange('min_reviews', 0)}
          helperText="Введите значение больше 0"
        />
      </Box>

    </Box>
  )
}