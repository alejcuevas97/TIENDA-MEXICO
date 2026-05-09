from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
from drf_spectacular.utils import extend_schema

from .models import Inventario
from .serializers import UserSerializersInv


# Vista completa con ModelViewSet para CRUD
@extend_schema(tags=["Inventario"])
class InvApiViews(ModelViewSet):
    queryset = Inventario.objects.all()
    serializer_class = UserSerializersInv
    filter_backends = [DjangoFilterBackend]
    # Si quieres filtros personalizados:
    # filterset_class = InventarioFilters

