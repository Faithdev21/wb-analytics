from rest_framework import viewsets
from django_filters.rest_framework import DjangoFilterBackend
from products.models import Product
from api.pagination import ProductPagination
from api.serializers import ProductSerializer
from api.filters import ProductFilter


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.all().order_by('-review_count')
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilter
    pagination_class = ProductPagination
