from rest_framework.response import Response
from rest_framework import status
from apps.inventario.models import Inventario
from rest_framework.views import APIView
from .serializers import UserSerializersProd
from drf_spectacular.utils import extend_schema


#vistas para consultar todos los productos
class ProdApiViews(APIView):
    #lo utilizo para consultar datos
    def get(self,request):
        serial= UserSerializersProd(Inventario.objects.all(), many=True)
        return Response(status=status.HTTP_200_OK, data=serial.data)


    
