from rest_framework.serializers import ModelSerializer
from .models import Inventario

#creando las serializacion de registro
class UserSerializersProd(ModelSerializer):
    class Meta:
        model= Inventario
        fields=['id','nombre','descripcion','precio']
        
