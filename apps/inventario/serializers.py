from rest_framework.serializers import ModelSerializer
from .models import Inventario

#creando las serializacion de registro
class UserSerializersProd(ModelSerializer):
    class Meta:
        model= Inventario
        fields=['Codigo','Producto','Precio_1kg','Precio_1_4kg','Precio_100kg']
        
