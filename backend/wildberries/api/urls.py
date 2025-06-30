from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import ProductViewSet

app_name = "api"

router_v1 = DefaultRouter()
router_v1.register('products', ProductViewSet, basename='products')

urlpatterns = [
    path('', include(router_v1.urls)),
]

