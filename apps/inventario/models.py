from django.db import models

# creando los modelos oara los inventarios
class Inventario(models.Model):
    Codigo=models.CharField(max_length=150, unique=True, primary_key=True)
    Categoria=models.CharField(max_length=150)
    fecha_de_registro=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.Categoria}({self.Codigo})"
    
    #lo utilizo para ordenar por fecha de registro
    class Meta:
        ordering= ['fecha_de_registro']
        
class Producto(models.Model):
    producto = models.ForeignKey(Inventario, on_delete=models.CASCADE)
    stock = models.IntegerField()
    Precio_1kg=models.DecimalField(max_digits=10, decimal_places=2)
    Precio_1_4g=models.DecimalField(max_digits=10, decimal_places=2)
    Precio_100g=models.DecimalField(max_digits=10, decimal_places=2)
    Moneda=models.CharField(max_length=100)

