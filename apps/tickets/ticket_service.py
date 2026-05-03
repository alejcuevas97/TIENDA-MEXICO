from django.db import transaction
from tickets.models import TicketItem

def procesar_ticket(ticket_form,formset):
    with transaction.atomic():
                ticket=ticket_form.save()
                for item_form in formset:
                    producto=item_form.cleaned_data.get('producto')
                    cantidad=item_form.cleaned_data.get('cantidad') or 0
                    if not producto or cantidad<=0:
                        continue
                    
                    validar_stock(ticket,producto,cantidad)
                    
                    crear_item_ticket(ticket,producto,cantidad)
                    
                    descontar_stock(producto,cantidad)
                    
def validar_stock(producto,cantidad):
    if producto.stock < cantidad:
        raise ValueError(
            f"No hay suficiente stock de {producto.nombre}.Disponible:{producto.stock}")  

def crear_item_ticket(ticket,producto,cantidad):
    TicketItem.objects.create(
        ticket=ticket,
        producto=producto,
        cantidad=cantidad
    )
    
def descontar_stock(producto,cantidad):
    producto.stock -= cantidad
    producto.save()
                                   