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

```
inventario_api/
│── inventario/          # App principal
│   ├── models.py        # Modelo Producto
│   ├── serializers.py   # Serializador Producto
│   ├── views.py         # Vistas con DRF
│   └── urls.py          # Rutas de la app
│
│── usuarios/            # App de usuarios
│   ├── models.py        # Modelo Usuario
│   ├── serializers.py   # Serializador Usuario
│   ├── views.py         # Registro/Login
│   └── urls.py          # Rutas de usuarios
│
│── inventario_api/      # Configuración del proyecto
│   ├── settings.py
│   └── urls.py
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

---

Alejandro, este README está listo para que lo uses en tu repositorio.  
¿Quieres que lo adapte específicamente a tu **caso agrícola** (ejemplo: inventario de insumos, animales, cultivos) para que quede más alineado con tu portafolio?
