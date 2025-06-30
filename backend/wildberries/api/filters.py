from django_filters.rest_framework import FilterSet, NumberFilter
from products.models import Product


class ProductFilter(FilterSet):
    min_price = NumberFilter(field_name='price', lookup_expr='gte')
    max_price = NumberFilter(field_name='price', lookup_expr='lte')
    min_rating = NumberFilter(field_name='rating', lookup_expr='gte')
    min_reviews = NumberFilter(field_name='review_count', lookup_expr='gte')

    class Meta:
        model = Product
        fields = []
