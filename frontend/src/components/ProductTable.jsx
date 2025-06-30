import React from 'react'
import PropTypes from 'prop-types'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Paper,
  TableContainer
} from '@mui/material'

function ProductTable({ products = [], sort, setSort }) {
  const handleSort = (field) => {
    const isAsc = sort.field === field && sort.order === 'asc'
    setSort({ field, order: isAsc ? 'desc' : 'asc' })
  }

  const sortedProducts = [...products].sort((a, b) => {
    if (!sort || !sort.field) return 0
    const valA = a[sort.field]
    const valB = b[sort.field]

    if (typeof valA === 'string') {
      return sort.order === 'asc'
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA)
    } else {
      return sort.order === 'asc' ? valA - valB : valB - valA
    }
  })

  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={sort.field === 'name'}
                direction={sort.field === 'name' ? sort.order : 'asc'}
                onClick={() => handleSort('name')}
              >
                Название товара
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.field === 'price'}
                direction={sort.field === 'price' ? sort.order : 'asc'}
                onClick={() => handleSort('price')}
              >
                Цена
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.field === 'discount_price'}
                direction={sort.field === 'discount_price' ? sort.order : 'asc'}
                onClick={() => handleSort('discount_price')}
              >
                Цена со скидкой
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.field === 'rating'}
                direction={sort.field === 'rating' ? sort.order : 'asc'}
                onClick={() => handleSort('rating')}
              >
                Рейтинг
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sort.field === 'review_count'}
                direction={sort.field === 'review_count' ? sort.order : 'asc'}
                onClick={() => handleSort('review_count')}
              >
                Отзывов
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedProducts.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>{p.price?.toLocaleString()} ₽</TableCell>
              <TableCell>{p.discount_price?.toLocaleString()} ₽</TableCell>
              <TableCell>⭐ {p.rating}</TableCell>
              <TableCell>💬 {p.review_count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

ProductTable.propTypes = {
  products: PropTypes.array.isRequired,
  sort: PropTypes.shape({
    field: PropTypes.string.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired
  }).isRequired,
  setSort: PropTypes.func.isRequired
}

export default ProductTable