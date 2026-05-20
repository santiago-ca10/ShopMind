# 🧠 ShopMind Backend

API REST del sistema ShopMind construida con Node.js, Express y MongoDB.

---

##  Funcionalidades

- Autenticación de usuarios (JWT)
- Registro e inicio de sesión
- CRUD de productos
- Gestión de pedidos
- Control de inventario
- Roles (admin / user)
- Asistente IA (endpoint /ia)
- Dashboard de métricas

---

##  Tecnologías

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

---

##  Estructura del backend

```text
src/
├── config/ # Conexión a base de datos
├── controllers/ # Lógica de negocio
├── models/ # Esquemas MongoDB
├── routes/ # Endpoints API
├── middleware/ # Auth y roles
├── utils/ # Helpers (JWT)
└── app.js
```

---

##  Autenticación

El sistema utiliza JSON Web Tokens (JWT) para la autenticación de usuarios.

Las rutas protegidas requieren enviar el token en el header de la solicitud:
```http
Authorization: Bearer <TOKEN>
```

---

##  Endpoints principales

### Auth
- POST `/api/auth/register`
- POST `/api/auth/login`

### Productos
- GET `/api/productos`
- POST `/api/productos`
- PUT `/api/productos/:id`
- DELETE `/api/productos/:id`

### Pedidos
- GET `/api/pedidos`
- GET `/api/pedidos/mis-pedidos`
- POST `/api/pedidos`
- PUT `/api/pedidos/:id/estado`

### IA
- POST `/api/ia`

### Dashboard
- GET `/api/dashboard`

---

##  Ejecución

```bash
npm install
node src/app.js
```
## Variables de entorno

Crear `.env`:
```
PORT=3000
MONGO_URI=tu_conexion_mongodb
JWT_SECRET=tu_secreto
```
## Notas importantes
- El stock se actualiza automáticamente al crear pedidos
- Los roles controlan acceso a rutas admin
- Las rutas protegidas requieren JWT válido