import React, { useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Button,
  Stack,
  CircularProgress
} from '@mui/material'

import { getProducts, getAllProductsPaginated } from './api'
import Filters from './components/Filters'
import ProductTable from './components/ProductTable'
import PriceHistogram from './components/PriceHistogram'
import DiscountVsRatingChart from './components/DiscountVsRatingChart'

function App() {
  const defaultFilters = {
    min_price: 0,
    max_price: 100000,
    min_rating: '',
    min_reviews: ''
  }

  const [pendingFilters, setPendingFilters] = useState(defaultFilters)
  const [appliedFilters, setAppliedFilters] = useState({})

  const [products, setProducts] = useState([])
  const [allProducts, setAllProducts] = useState([])

  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null
  })
  const [page, setPage] = useState(1)

  const [sort, setSort] = useState({ field: 'rating', order: 'desc' })
  const [loading, setLoading] = useState(false)
  const [loadingAll, setLoadingAll] = useState(false)

  const handleSearch = () => {
    const filtersToApply = { ...pendingFilters }
    setAppliedFilters(filtersToApply)
    setPage(1)

    setLoading(true)
    getProducts({ ...filtersToApply, page: 1 })
      .then(res => {
        const data = res.data
        setProducts(data.results || [])
        setPagination({
          count: data.count,
          next: data.next,
          previous: data.previous
        })
      })
      .catch(err => {
        console.error('❌ Ошибка загрузки товаров:', err)
      })
      .finally(() => setLoading(false))

    setLoadingAll(true)
    getAllProductsPaginated(filtersToApply)
      .then(data => {
        setAllProducts(data)
      })
      .catch(err => {
        console.error("❌ Ошибка полной подгрузки:", err)
      })
      .finally(() => setLoadingAll(false))
  }

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        📈 Wildberries Analytics
      </Typography>

      <Filters filters={pendingFilters} setFilters={setPendingFilters} />

      <Box sx={{ mb: 3 }}>
        <Button variant="contained" onClick={handleSearch} disabled={loading || loadingAll}>
          {(loading || loadingAll) ? <CircularProgress size={24} /> : '🔍 Поиск'}
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'flex-start',
          gap: 4
        }}
      >
        <Box sx={{ flex: 2 }}>
          {loading ? (
            <CircularProgress />
          ) : (
            <ProductTable products={products} sort={sort} setSort={setSort} />
          )}

          <Stack direction="row" spacing={2} sx={{ my: 2 }}>
            <Button
              variant="outlined"
              onClick={() => {
                const newPage = page - 1
                setPage(newPage)

                setLoading(true)
                getProducts({ ...appliedFilters, page: newPage })
                  .then(res => {
                    const data = res.data
                    setProducts(data.results || [])
                    setPagination({
                      count: data.count,
                      next: data.next,
                      previous: data.previous
                    })
                  })
                  .catch(err => {
                    console.error('❌ Ошибка при переходе по страницам:', err)
                  })
                  .finally(() => setLoading(false))
              }}
              disabled={!pagination.previous || loading}
            >
              ← Назад
            </Button>
            <Box>Страница {page}</Box>
            <Button
              variant="outlined"
              onClick={() => {
                const newPage = page + 1
                setPage(newPage)

                setLoading(true)
                getProducts({ ...appliedFilters, page: newPage })
                  .then(res => {
                    const data = res.data
                    setProducts(data.results || [])
                    setPagination({
                      count: data.count,
                      next: data.next,
                      previous: data.previous
                    })
                  })
                  .catch(err => {
                    console.error('❌ Ошибка при переходе по страницам:', err)
                  })
                  .finally(() => setLoading(false))
              }}
              disabled={!pagination.next || loading}
            >
              Вперёд →
            </Button>
          </Stack>
        </Box>

        {(allProducts.length > 0 || loadingAll) ? (
            <Box sx={{ flex: 1, minWidth: 300 }}>
                <Box
                    display="flex"
                    flexDirection={{ xs: 'column', md: 'row' }}
                    gap={2}
                    mt={1}
                >
                    <Box flex={1}>
                        <Typography variant="h6" align="center" gutterBottom>
                            📊 Распределение цен
                        </Typography>
                        {loadingAll ? (
                            <Box display="flex" justifyContent="center" my={2}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <PriceHistogram products={allProducts} />
                        )}
                    </Box>

                    <Box flex={1}>
                        <Typography variant="h6" align="center" gutterBottom>
                            📈 Скидка vs Рейтинг
                        </Typography>
                        {loadingAll ? (
                            <Box display="flex" justifyContent="center" my={2}>
                                <CircularProgress />
                            </Box>
                        ) : (
                            <DiscountVsRatingChart products={allProducts} />
                        )}
                    </Box>
                </Box>
            </Box>
        ) : (
            <Box sx={{ flex: 1, minWidth: 300, opacity: 0.5 }}>
                <Typography variant="body2" fontStyle="italic">
                    👇 Нажмите "Поиск", чтобы отобразить графики анализа
                </Typography>
            </Box>
        )}
      </Box>
    </Container>
  )
}

export default App