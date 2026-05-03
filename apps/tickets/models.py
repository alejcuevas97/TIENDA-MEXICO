from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre=models.CharField(max_length=100)
    stock=models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return self.nombre
    
class Ticket(models.Model):
    fecha=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'Ticket # {self.id}-{self.fecha}'
    
class TicketItem(models.Model):
    ticket=models.ForeignKey(Ticket,on_delete=models.CASCADE,related_name='items')
    producto=models.ForeignKey(Producto,on_delete=models.PROTECT)
    cantidad=models.PositiveIntegerField()
    
    def __str__(self):
        return f'{self.cantidad} x {self.producto.nombre}'
    
          
    