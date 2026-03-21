# 🛠 Backend de Inventario con Django

Este proyecto es un **backend desarrollado en Django y Django REST Framework (DRF)** que incluye:

- Sistema de **registro e inicio de sesión** con autenticación JWT.
- Módulo de **gestión de productos** para un inventario.
- Endpoints RESTful para CRUD de usuarios y productos.

---

## 🚀 Características principales

- **Autenticación JWT**: Registro, login y protección de rutas.
- **Gestión de productos**:
  - Crear, listar, actualizar y eliminar productos.
  - Campos básicos: codigo, categoria, precio, moneda y fecha de registro.
- **API RESTful** con DRF.
- **Base de datos SQL** (SQLite por defecto, adaptable a PostgreSQL/MySQL).

---

## 📂 Estructura del proyecto

```bash
tienda_backend/                # Proyecto principal
│── manage.py                  # Script de gestión de Django
│── tienda_backend/            # Configuración global del proyecto
│   ├── __init__.py
│   ├── settings.py            # Configuración general
│   ├── urls.py                # Rutas principales
│   ├── wsgi.py                # Servidor WSGI
│   └── asgi.py                # Servidor ASGI
│
│── apps/                      # Carpeta contenedora de aplicaciones
│   ├── api/                   # API central (DRF)
│   │   ├── __init__.py
│   │   ├── urls.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   └── tests.py
│   │
│   ├── inventario/            # Gestión de productos e inventario
│   │   ├── __init__.py
│   │   ├── models.py          # Modelo Producto
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tests.py
│   │
│   ├── tickets/               # Soporte y tickets de clientes
│   │   ├── __init__.py
│   │   ├── models.py          # Modelo Ticket
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tests.py
│   │
│   ├── tienda/                # Lógica de la tienda (órdenes, pagos)
│   │   ├── __init__.py
│   │   ├── models.py          # Modelo Orden/Carrito
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── tests.py
│   │
│   └── usuarios/              # Gestión de usuarios y autenticación
│       ├── __init__.py
│       ├── models.py          # Modelo Usuario extendido
│       ├── serializers.py
│       ├── views.py           # Registro/Login
│       ├── urls.py
│       └── tests.py
│
│── requirements.txt           # Dependencias del proyecto
│── README.md                  # Documentación inicial
│── .env                       # Variables de entorno

```
---
## ⚙️ Instalación y configuración

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tuusuario/inventario_api.git
   cd inventario_api
   ```

2. Crear entorno virtual e instalar dependencias:
   ```bash
   python -m venv venv
   source venv/bin/activate   # Linux/Mac
   venv\Scripts\activate      # Windows
   pip install -r requirements.txt
   ```

3. Migrar la base de datos:
   ```bash
   python manage.py migrate
   ```

4. Crear superusuario:
   ```bash
   python manage.py createsuperuser
   ```

5. Ejecutar servidor:
   ```bash
   python manage.py runserver
   ```

---

## 🔑 Endpoints principales

### Autenticación
- `POST /api/usuarios/register/` → Registro de usuario
- `POST /api/usuarios/login/` → Inicio de sesión (JWT)

### Inventario
- `GET /api/productos/` → Listar productos
- `POST /api/productos/` → Crear producto
- `PUT /api/productos/{id}/` → Actualizar producto
- `DELETE /api/productos/{id}/` → Eliminar producto

---

## 📖 Ejemplo de uso

### Registro
```json
POST /api/usuarios/register/
{
  "username": "alejandro",
  "email": "alejandro@mail.com",
  "password": "123456"
}
```

### Login
```json
POST /api/usuarios/login/
{
  "username": "alejandro",
  "password": "123456"
}
```

Respuesta:
```json
{
  "access": "jwt_token_aqui",
  "refresh": "refresh_token_aqui"
}
```

### Crear producto
```json
POST /api/productos/
{
  "nombre": "Laptop Dell",
  "descripcion": "Core i7, 16GB RAM",
  "cantidad": 10,
  "precio": 1200.50
}
```

---

## 📌 Tecnologías utilizadas
- Django
- Django REST Framework
- JWT (SimpleJWT)
- SQLite (por defecto)

---

## ✨ Próximas mejoras
- Filtros y búsquedas avanzadas.
- Documentación automática con Swagger.
- Reportes estadísticos del inventario.
```


