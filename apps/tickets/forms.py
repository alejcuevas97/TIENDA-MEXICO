from django import forms
from django.forms import inlineformset_factory
from .models import Ticket, TicketItem

#un formulario para crear un ticket con varios productos. 
class TicketForm(forms.ModelForm):
    class Meta:
        model= Ticket
        field=[]

class TicketItemForm(forms.ModelForm):
    class Meta:
        model=TicketItem
        field=['producto,cantidad']

TicketItemFormSet=inlineformset_factory(Ticket,TicketItem, form=TicketItemForm, extra=1)

                