from django.apps import AppConfig


class TiendaConfig(AppConfig):
    #esto debo agregar para poder enrutar 'apps.tienda'
    default_auto_field='django.db.models.BigAutoField'
    name = 'apps.tienda'
