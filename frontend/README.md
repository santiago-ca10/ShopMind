# 🛍️ ShopMind Frontend

Interfaz de usuario del sistema ShopMind, una tienda inteligente con carrito de compras, panel admin y asistente IA.

---

##  Funcionalidades

- Catálogo de productos dinámico
- Búsqueda en tiempo real
- Filtro por categorías
- Carrito de compras persistente (localStorage)
- Checkout simulado
- Asistente IA de recomendaciones
- Panel de administración
- Visualización de pedidos del usuario
- Modo oscuro / claro

---

##  Tecnologías

- React (Vite)
- Context API
- Axios
- Tailwind CSS
- React Hot Toast

---

##  Estructura del frontend

```text
src/
├── api/ # Configuración Axios
├── components/ # Componentes reutilizables
├── context/ # Estados globales (carrito, auth, theme)
├── pages/ # Vistas principales
├── services/ # Lógica de API
├── styles/ # Estilos globales
└── App.jsx
```
---

##  Ejecución

```bash
npm install
npm run dev
```
## Comunicación con backend

El frontend consume la API REST:

- Productos → `/api/productos`
- Pedidos → `/api/pedidos`
- Auth → `/api/auth`
- IA → `/api/ia`
---

## UI / UX
- Diseño tipo e-commerce moderno
- Cards de productos
- Animaciones suaves
- Dark mode
- Responsive design
---
## Notas
- El carrito se guarda en `localStorage`
- No requiere login para ver productos
- Algunas funciones requieren autenticación JWT