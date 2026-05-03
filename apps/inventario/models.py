from django.db import models

# creando los modelos oara los inventarios
class Inventario(models.Model):
    Codigo=models.CharField(max_length=150, unique=True)
    Categoria=models.CharField(max_length=150)
    Producto=models.CharField(max_length=250)
    Precio_1kg=models.DecimalField(max_digits=10, decimal_places=2)
    Precio_1_4kg=models.DecimalField(max_digits=10, decimal_places=2)
    Precio_100kg=models.DecimalField(max_digits=10, decimal_places=2)
    Moneda=models.CharField(max_length=100)
    fecha_de_registro=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.Producto}({self.Codigo})"
    
    #lo utilizo para ordenar por fecha de registro
    class Meta:
        ordering= ['fecha_de_registro']
