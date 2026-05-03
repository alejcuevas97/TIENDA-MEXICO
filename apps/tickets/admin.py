from django.contrib import admin
from apps.tickets.models import Producto,Ticket,TicketItem

# Register your models here.
admin.site.register(Producto)
admin.site.register(Ticket)
admin.site.register(TicketItem)