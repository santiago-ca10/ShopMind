# 🛍️ ShopMind

Sistema de tienda inteligente con carrito de compras, panel administrativo y asistente de IA para recomendación de productos.

---

##  Demo del proyecto

### Video explicación del sistema:  
[![Ver video del proyecto](https://img.shields.io/badge/YouTube-Ver%20demostración-red?style=for-the-badge&logo=youtube)]( Video )

---

##  Descripción

ShopMind es una aplicación fullstack que simula una tienda moderna con funcionalidades reales de e-commerce:

- Catálogo de productos
- Búsqueda y filtros por categoría
- Carrito de compras persistente
- Simulación de pagos y pedidos
- Panel administrativo completo
- Gestión de inventario
- Asistente inteligente con IA
- Sistema de autenticación con JWT

---

##  Funcionalidades principales

###  Usuario
- Ver productos disponibles
- Buscar productos por nombre
- Filtrar por categorías
- Agregar productos al carrito
- Modificar cantidades en carrito
- Realizar pedidos
- Ver historial de pedidos

###  Asistente IA
- Recomendación de productos según presupuesto
- Sugerencias por necesidad (snacks, tecnología, bebidas)
- Integración con productos reales del sistema
- Agregado directo al carrito

###  Administrador
- CRUD de productos
- Gestión de pedidos
- Control de stock
- Panel de métricas (ventas, usuarios, pedidos)
- Cambio de estado de pedidos

---

##  Tecnologías utilizadas

### Frontend
- React (Vite)
- Context API
- Axios
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT (autenticación)
- bcryptjs

---

##  Arquitectura del proyecto

``` text
Frontend (React)
↓
API REST (Express)
↓
MongoDB (Base de datos)
```

Flujo general:
``` text
Usuario → UI → API → Base de datos → Respuesta → UI
```
---

##  Estructura del proyecto

```
ShopMind/
│
├── backend/ # API REST + lógica de negocio
├── frontend/ # Interfaz de usuario
└── docs/ # Documentación técnica
```

---

##  Instalación y ejecución

###  Backend
```bash
cd backend
npm install
node src/app.js
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```
## Variables de entorno (backend)

### Crear archivo .env:
```bash
PORT=3000
MONGO_URI=tu_conexion_mongodb
JWT_SECRET=tu_secreto
```
## Estado del proyecto

✔ Backend funcional

✔ Frontend funcional

✔ Autenticación JWT

✔ Carrito persistente

✔ Panel admin operativo

✔ IA integrada

✔ Base de datos MongoDB conectada
