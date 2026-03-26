from django.apps import AppConfig


class TicketsConfig(AppConfig):
    #esto debo agregar para poder enrutar 'apps.inventario'
    default_auto_field='django.db.models.BigAutoField'
    name = 'apps.tickets'
