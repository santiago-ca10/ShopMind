#  Arquitectura del sistema

## Frontend

React + Context API

### Responsabilidades
- UI
- carrito
- auth
- assistant IA
- dashboard admin

---

## Backend

Node.js + Express

### Responsabilidades
- API REST
- autenticación
- pedidos
- productos
- control de stock

---

## Base de datos

MongoDB

Colecciones principales:
- usuarios
- productos
- pedidos

---

## Flujo general
```text
Usuario → Frontend → API → MongoDB → Respuesta
```
