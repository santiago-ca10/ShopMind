# 🔐 Autenticación

El sistema utiliza JWT para autenticación.

---

## Flujo

1. Usuario inicia sesión
2. Backend genera token
3. Frontend guarda token
4. Token se envía en rutas protegidas

---

## Header requerido

```http
Authorization: Bearer <TOKEN>
```

## Roles
- admin
- user
## Middleware
- protect
- verifyRole