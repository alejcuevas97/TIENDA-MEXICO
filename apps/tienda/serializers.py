from rest_framework.serializers import ModelSerializer
from apps.inventario.models import Producto
import django_filters

#creando las serializacion de registro
class UserSerializersProd(ModelSerializer):
    class Meta:
        model= Producto
        fields=['producto','Precio_1kg','Precio_1_4g','Precio_100g','Moneda']

class ProductFilters(django_filters.FilterSet):
    productos = django_filters.CharFilter(field_name='producto', lookup_expr='exact')

    class Meta:
        model = Producto
        fields = {
            'producto': ['exact']
        }


