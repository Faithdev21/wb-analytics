from django_filters.rest_framework import FilterSet, NumberFilter
from rest_framework.exceptions import ValidationError

from products.models import Product


class ProductFilter(FilterSet):
    min_price = NumberFilter(field_name='price', lookup_expr='gte')
    max_price = NumberFilter(field_name='price', lookup_expr='lte')
    min_rating = NumberFilter(field_name='rating', lookup_expr='gte')
    min_reviews = NumberFilter(field_name='review_count', lookup_expr='gte')

    class Meta:
        model = Product
        fields = ['min_price', 'max_price', 'min_rating', 'min_reviews']

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        query_params = self.request.query_params
        errors = {}

        try:
            min_rating = float(query_params.get("min_rating", 0))
            if not (0 <= min_rating <= 5):
                errors["min_rating"] = ["Рейтинг должен быть от 0 до 5"]
        except ValueError:
            errors["min_rating"] = ["Некорректное значение рейтинга"]

        try:
            min_reviews = int(query_params.get("min_reviews", 0))
            if min_reviews < 0:
                errors["min_reviews"] = ["Количество отзывов не может быть < 0"]
        except ValueError:
            errors["min_reviews"] = ["Некорректное значение числа отзывов"]

        if errors:
            raise ValidationError(errors)
