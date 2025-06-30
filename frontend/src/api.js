import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export const getProducts = (filters = {}) => {
  console.log("Запрос с фильтрами:", filters)
  return api.get('/products/', { params: filters })
}

export const getAllProductsPaginated = async (filters = {}) => {
  let allProducts = []
  let page = 1
  let hasNext = true

  while (hasNext) {
    try {
      const res = await api.get('/products/', {
        params: { ...filters, page },
      })

      const data = res.data
      const currentPageResults = data.results || []
      allProducts = allProducts.concat(currentPageResults)

      if (data.next) {
        page += 1
      } else {
        hasNext = false
      }
      if (page > 600) break
    } catch (error) {
      console.error(`❌ Ошибка при загрузке страницы ${page}:`, error)
      hasNext = false
    }
  }

  return allProducts
}