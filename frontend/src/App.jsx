import { useEffect, useState } from "react";

function App() {

  const [productos, setProductos] = useState([]);

  // ⚠️ PON TU ID REAL
  const usuarioId = "PON_TU_USUARIO_ID";

  useEffect(() => {

    const obtenerProductos = async () => {
      try {

        const res = await fetch("http://localhost:3000/api/productos");
        const data = await res.json();

        setProductos(data);

      } catch (error) {
        console.error(error);
      }
    };

    obtenerProductos();
  }, []);

  const agregarAlCarrito = async (productoId) => {

    await fetch("http://localhost:3000/api/carrito", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        usuarioId,
        productoId,
        cantidad: 1
      })
    });

    alert("Producto agregado 🛒");
  };

  return (
    <div style={{
      padding: "20px",
      fontFamily: "Arial",
      background: "#f3f4f6",
      minHeight: "100vh"
    }}>

      <h1>🛒 ShopMind</h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: "20px"
      }}>

        {productos.map((producto) => (

          <div
            key={producto._id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >

            <h2>{producto.nombre}</h2>

            <p>
              Categoría: {producto.categoria}
            </p>

            <p>
              Precio: ${producto.precio}
            </p>

            <p>
              Stock: {producto.stock}
            </p>

            <button
              onClick={() => agregarAlCarrito(producto._id)}
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Agregar al carrito
            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default App;