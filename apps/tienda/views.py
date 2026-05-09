from rest_framework.viewsets import ModelViewSet,ReadOnlyModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from apps.inventario.models import Producto
from .serializers import UserSerializersProd


# ✅ Vista principal con ModelViewSet para CRUD
class ProdApiViews(ReadOnlyModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = UserSerializersProd
    filter_backends = [DjangoFilterBackend]
    # Si tienes filtros personalizados, puedes habilitarlos aquí:
    # filterset_class = ProductFilters

#  Otra vista (si quieres mantenerla separada)
class InventarioViewSet(ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = UserSerializersProd
    filter_backends = [DjangoFilterBackend]
    # filterset_class = ProductFilters
