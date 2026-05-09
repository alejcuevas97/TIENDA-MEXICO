from rest_framework.response import Response
from rest_framework import status
from apps.inventario.models import Inventario,Producto
from rest_framework.views import APIView
from .serializers import UserSerializersProd,ProductFilters
from drf_spectacular.utils import extend_schema
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets


#vistas para consultar todos los productos
class ProdApiViews(APIView):
    #lo utilizo para consultar datos
    def get(self,request):
        serial= UserSerializersProd(Producto.objects.all(), many=True)
        return Response(status=status.HTTP_200_OK, data=serial.data)

class InventarioViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = UserSerializersProd
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProductFilters    
