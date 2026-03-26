from django.shortcuts import render,redirect
from django.db import transaction
from django.contrib import messages
from apps.tickets.models import Producto, Ticket,TicketItem
from .forms import TicketForm,TicketItemFormSet
from django.conf import settings
from apps.tickets.ticket_service import procesar_ticket

# Vistas Ticket y descontar stock
def crear_ticket(request):
    if request.method=='POST':
        ticket_form=TicketForm(request.POST)
        formset=TicketItemFormSet(request.POST)
        
        if ticket_form.is_valid() and formset.is_valid():
            try:
                procesar_ticket(ticket_form,formset)
                messages.success(request,'Ticket creado y stock actualizado correctamente')
                return redirect('lista_tickets')

            except ValueError as e:
                messages.error(request,str(e))
                return redirect('crear_ticket')
            
            else:
                ticket_form=TicketForm()
                formset=TicketItemFormSet()
            
            return render(request,{
                'ticket_form':ticket_form,
                'formset':formset
            })        

#verificar stock disponible
            if producto.stock < cantidad:
                messages.error(request=f'NO hay suficiente stock de {producto.nombre}. Disponible:{producto.stock}')
                transaction.set_rollback(True)
                return redirect('crear_ticket')
#Crear Item
            TicketItem.objects.create(ticket=ticket, producto=producto, cantidad=cantidad)  
#Desconatar stock
            producto.stock-=cantidad
            producto.save()
            messages.success(request,'Ticket creado y stock actualizado correctamente')
            return redirect('lista_tickets')
    else:
        ticket_form= TicketForm()
        formset= TicketItemFormSet()
        return render(request,'crear_ticket.html',{'ticket_form':ticket_form,'formset':formset})
    
                                


    
    



