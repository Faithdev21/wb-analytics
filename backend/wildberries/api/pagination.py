from rest_framework.pagination import PageNumberPagination

from api.constants import PAGE_SIZE, MAX_PAGE_SIZE


class ProductPagination(PageNumberPagination):
    page_size = PAGE_SIZE
    page_query_param = 'page'
    page_size_query_param = 'page_size'
    max_page_size = MAX_PAGE_SIZE
