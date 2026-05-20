import {
  useState,
  useContext,
  useRef,
  useEffect
} from "react";

import API from "../api/axios";

import {
  CartContext
} from "../context/cart.context";

import toast from "react-hot-toast";

function Assistant() {

  const [mensaje, setMensaje] =
    useState("");

  const [chat, setChat] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const { addToCart } =
    useContext(CartContext);

  const chatEndRef = useRef(null);

  const inputRef = useRef(null);

  // AUTO SCROLL
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [chat, loading]);

  // ENVIAR MENSAJE
  const handleAsk = async () => {

    if (!mensaje.trim()) return;

    const userMsg = mensaje;

    setMensaje("");

    inputRef.current?.focus();

    // 👇 historial nuevo
    const nuevoChat = [
      ...chat,
      {
        role: "user",
        text: userMsg
      }
    ];

    setChat(nuevoChat);

    try {

      setLoading(true);

      const res = await API.post(
        "/ia",
        {
          mensaje: userMsg,
          historial: nuevoChat
        }
      );

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            res.data.respuesta ||
            "Sin respuesta",
          productos:
            res.data.productos || []
        }
      ]);

    } catch (error) {

      console.log(error);

      setChat((prev) => [
        ...prev,
        {
          role: "ai",
          text: "❌ Error con la IA",
          productos: []
        }
      ]);

    } finally {

      setLoading(false);

    }

  };

  const suggestions = [
    "Tengo 10000 pesos para snacks",
    "Recomiéndame una bebida",
    "Quiero algo dulce",
    "Busco una memoria USB"
  ];

  return (

    <main className="
      h-[calc(100vh-70px)]
      bg-gray-100
      dark:bg-black
      flex
      flex-col
    ">

      {/* HEADER */}
      <div className="
        border-b
        dark:border-gray-800
        px-6
        py-4
        bg-white
        dark:bg-gray-950
        flex
        items-center
        justify-between
        sticky
        top-0
        z-10
      ">

        <div>

          <h1 className="
            text-2xl
            font-bold
            dark:text-white
          ">
            🤖 ShopMind IA
          </h1>

          <p className="
            text-sm
            text-gray-500
          ">
            Asistente inteligente de compras
          </p>

        </div>

      </div>

      {/* CHAT */}
      <div className="
        flex-1
        overflow-y-auto
        px-4
        py-6
      ">

        {/* EMPTY */}
        {chat.length === 0 && (

          <div className="
            h-full
            flex
            flex-col
            items-center
            justify-center
            text-center
          ">

            <div className="
              bg-black
              text-white
              w-20
              h-20
              rounded-3xl
              flex
              items-center
              justify-center
              text-4xl
              mb-6
            ">
              🤖
            </div>

            <h2 className="
              text-3xl
              font-bold
              dark:text-white
            ">
              ¿Qué deseas comprar?
            </h2>

            <p className="
              text-gray-500
              mt-3
              max-w-md
            ">
              Puedo recomendarte productos,
              snacks, bebidas, tecnología
              y ayudarte con tu compra.
            </p>

            {/* SUGGESTIONS */}
            <div className="
              mt-8
              grid
              grid-cols-1
              md:grid-cols-2
              gap-3
              w-full
              max-w-2xl
            ">

              {suggestions.map((s, i) => (

                <button
                  key={i}
                  onClick={() => {
                    setMensaje(s);
                    inputRef.current?.focus();
                  }}
                  className="
                    bg-white
                    dark:bg-gray-900
                    border
                    dark:border-gray-800
                    rounded-2xl
                    p-4
                    text-left
                    hover:scale-[1.02]
                    hover:shadow-lg
                    transition
                    dark:text-white
                  "
                >
                  {s}
                </button>

              ))}

            </div>

          </div>

        )}

        {/* MENSAJES */}
        <div className="
          max-w-5xl
          mx-auto
          space-y-6
        ">

          {chat.map((msg, i) => (

            <div
              key={i}
              className={`
                flex
                ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }
              `}
            >

              <div
                className={`
                  max-w-[85%]
                  rounded-3xl
                  px-5
                  py-4
                  shadow-sm
                  ${
                    msg.role === "user"
                      ? `
                        bg-black
                        text-white
                        rounded-br-md
                      `
                      : `
                        bg-white
                        dark:bg-gray-900
                        dark:text-white
                        rounded-bl-md
                        border
                        dark:border-gray-800
                      `
                  }
                `}
              >

                {/* TEXTO */}
                <p className="
                  whitespace-pre-line
                  leading-relaxed
                ">
                  {msg.text}
                </p>

                {/* PRODUCTOS */}
                {msg.productos &&
                  msg.productos.length > 0 && (

                  <div className="
                    mt-5
                    grid
                    gap-3
                  ">

                    {msg.productos.map((p) => (

                      <div
                        key={p._id}
                        className="
                          bg-gray-50
                          dark:bg-gray-800
                          rounded-2xl
                          p-3
                          flex
                          items-center
                          gap-4
                        "
                      >

                        {/* IMAGE */}
                        <img
                          src={
                            p.imagen ||
                            "https://picsum.photos/200"
                          }
                          alt={p.nombre}
                          className="
                            w-16
                            h-16
                            rounded-xl
                            object-cover
                          "
                        />

                        {/* INFO */}
                        <div className="flex-1">

                          <h3 className="
                            font-bold
                            dark:text-white
                          ">
                            {p.nombre}
                          </h3>

                          <p className="
                            text-sm
                            text-gray-500
                          ">
                            {p.categoria}
                          </p>

                          <p className="
                            text-lg
                            font-bold
                            mt-1
                            dark:text-white
                          ">
                            $
                            {p.precio.toLocaleString(
                              "es-CO"
                            )}
                          </p>

                        </div>

                        {/* BUTTON */}
                        <button
                          onClick={() => {

                            addToCart({
                              _id: p._id,
                              nombre: p.nombre,
                              precio: p.precio,
                              imagen: p.imagen,
                              categoria: p.categoria
                            });

                            toast.success(
                              "Producto agregado 🛒"
                            );

                          }}
                          className="
                            bg-black
                            hover:bg-gray-800
                            text-white
                            px-4
                            py-2
                            rounded-xl
                            transition
                          "
                        >
                          Agregar
                        </button>

                      </div>

                    ))}

                  </div>

                )}

              </div>

            </div>

          ))}

          {/* LOADING */}
          {loading && (

            <div className="
              flex
              justify-start
            ">

              <div className="
                bg-white
                dark:bg-gray-900
                border
                dark:border-gray-800
                px-5
                py-4
                rounded-3xl
                rounded-bl-md
                dark:text-white
              ">
                🤖 Escribiendo...
              </div>

            </div>

          )}

          <div ref={chatEndRef} />

        </div>

      </div>

      {/* INPUT */}
      <div className="
        border-t
        dark:border-gray-800
        bg-white
        dark:bg-gray-950
        p-4
      ">

        <div className="
          max-w-5xl
          mx-auto
          flex
          items-center
          gap-3
        ">

          <input
            ref={inputRef}
            value={mensaje}
            onChange={(e) =>
              setMensaje(e.target.value)
            }
            onKeyDown={(e) =>
              e.key === "Enter" &&
              handleAsk()
            }
            placeholder="
              Pregunta por productos...
            "
            className="
              flex-1
              bg-gray-100
              dark:bg-gray-900
              dark:text-white
              border
              dark:border-gray-800
              rounded-2xl
              px-5
              py-4
              outline-none
              focus:ring-2
              focus:ring-black
              dark:focus:ring-white
            "
          />

          <button
            onClick={handleAsk}
            disabled={loading}
            className="
              bg-black
              hover:bg-gray-800
              text-white
              px-6
              py-4
              rounded-2xl
              transition
              disabled:opacity-50
            "
          >
            Enviar
          </button>

        </div>

      </div>

    </main>

  );

}

export default Assistant;