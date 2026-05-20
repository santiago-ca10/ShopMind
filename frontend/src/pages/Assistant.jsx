import { useState, useContext, useRef, useEffect } from "react";
import API from "../api/axios";
import { CartContext } from "../context/cart.context";

function Assistant() {
  const [mensaje, setMensaje] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useContext(CartContext);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat, loading]);

  const handleAsk = async () => {
    if (!mensaje.trim()) return;

    const userMsg = mensaje;
    setMensaje("");

    setChat((prev) => [...prev, { role: "user", text: userMsg }]);

    try {
      setLoading(true);

      const res = await API.post("/ia", { mensaje: userMsg });

      // Ahora guardamos texto y productos por separado
      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: res.data.respuesta || "Sin respuesta",
          productos: res.data.productos || [],
        },
      ]);

    } catch (error) {
      console.log(error);
      setChat((prev) => [
        ...prev,
        { role: "ai", text: "❌ Error con la IA", productos: [] },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-black p-6 flex flex-col">

      <h1 className="text-3xl font-bold mb-4 dark:text-white">
        🤖 Asistente IA ShopMind
      </h1>

      <div className="flex-1 bg-white dark:bg-gray-900 rounded-2xl p-4 overflow-y-auto space-y-4">

        {chat.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-2xl max-w-[80%] ${
              msg.role === "user"
                ? "ml-auto bg-black text-white"
                : "mr-auto bg-gray-200 dark:bg-gray-700 dark:text-white"
            }`}
          >
            {/* Texto del mensaje */}
            <p className="whitespace-pre-line">{msg.text}</p>

            {/* Tarjetas de productos — solo si hay */}
            {msg.productos && msg.productos.length > 0 && (
              <div className="mt-4 space-y-3">
                {msg.productos.map((p, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm"
                  >
                    <div>
                      <p className="font-bold dark:text-white">{p.nombre}</p>
                      <p className="text-sm text-gray-500">${p.precio}</p>
                    </div>
                    <button
                      onClick={() => addToCart({ 
                        _id: p._id,
                        nombre: p.nombre, 
                        precio: p.precio, 
                        imagen: p.imagen,
                        categoria: p.categoria
                        })}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Agregar
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}

        {loading && (
          <p className="text-gray-500 dark:text-white">🤖 IA escribiendo...</p>
        )}

        <div ref={chatEndRef} />
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Escribe tu mensaje..."
          className="flex-1 p-3 rounded-xl border dark:bg-gray-800 dark:text-white"
        />
        <button
          onClick={handleAsk}
          className="bg-black hover:bg-gray-800 text-white px-6 rounded-xl transition"
        >
          Enviar
        </button>
      </div>

    </main>
  );
}

export default Assistant;