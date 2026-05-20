import axios from "axios";
import Producto from "../models/producto.model.js";

export const chatIA = async (req, res) => {
  try {
    const { mensaje, historial = [] } = req.body;

    const mensajeLower = mensaje.toLowerCase();

    // 🔥 PALABRAS CLAVE → CATEGORÍAS
    const categoriasIA = {
      "pen drive": ["tecnología", "usb"],
      memoria: ["tecnología", "usb"],
      usb: ["tecnología", "usb"],
      tecnologia: ["tecnología"],
      tecnología: ["tecnología"],

      snack: ["snacks"],
      snacks: ["snacks"],
      papitas: ["snacks"],
      papas: ["snacks"],
      dulces: ["snacks"],
      galletas: ["snacks"],

      bebida: ["bebidas"],
      bebidas: ["bebidas"],
      gaseosa: ["bebidas"],
      agua: ["bebidas"],
    };

    // 🔥 TRAER PRODUCTOS
    const productos = await Producto.find().lean();

    // 🔥 FILTRO INTELIGENTE
    let productosFiltrados = productos;

    for (const key in categoriasIA) {
      if (mensajeLower.includes(key)) {
        productosFiltrados = productos.filter((p) =>
          categoriasIA[key].some((cat) =>
            p.categoria?.toLowerCase().includes(cat)
          ) ||
          p.nombre?.toLowerCase().includes(key)
        );

        break;
      }
    }

    // 🔥 CATÁLOGO IA
    const productosTexto = productosFiltrados
      .slice(0, 20)
      .map(
        (p) =>
          `${p._id} | ${p.nombre} | ${p.categoria} | ${p.precio}`
      )
      .join("\n");

    // 🔥 HISTORIAL
    const historialTexto = historial
      .filter((m) => m.text)
      .map(
        (m) =>
          `${m.role === "user" ? "Usuario" : "IA"}: ${m.text}`
      )
      .join("\n");

    // 🔥 PROMPT ULTRA CONTROLADO
    const prompt = `
Eres "ShopMind IA", un asistente de compras para una tienda online.

🚨 REGLAS OBLIGATORIAS:
- SOLO puedes recomendar productos del catálogo.
- NO inventes productos.
- NO inventes precios.
- NO inventes categorías.
- Máximo 3 productos.
- Si no hay productos:
  MENSAJE: No tenemos ese producto disponible.
  IDS:

⚠️ FORMATO OBLIGATORIO.
⚠️ SIEMPRE debes devolver IDS válidos.
⚠️ NUNCA respondas sin IDS.

Formato exacto:

MENSAJE: texto corto
IDS: id1,id2,id3

Ejemplo:

MENSAJE: Te recomiendo estas opciones.
IDS: 661aa12,661aa13

📚 CATÁLOGO:
${productosTexto}

📝 CONVERSACIÓN:
${historialTexto || "Sin historial"}

👤 USUARIO:
${mensaje}
`;

    // 🔥 OLLAMA
    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.2:3b",
        prompt,
        stream: false,
      }
    );

    const raw = response.data.response
      .replace(/\r/g, "")
      .trim();

    console.log("RAW IA:", raw);

    // 🔥 EXTRAER MENSAJE
    const mensajeMatch =
      raw.match(/MENSAJE:\s*(.+)/i);

    const mensajeTexto =
      mensajeMatch
        ? mensajeMatch[1].trim()
        : "Aquí tienes algunas recomendaciones.";

    // 🔥 EXTRAER IDS
    const idsMatch =
      raw.match(/IDS:\s*([a-f0-9,\s]+)/i);

    let productosRecomendados = [];

    // ✅ SI IA DEVUELVE IDS
    if (idsMatch) {

      const ids = idsMatch[1]
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

      productosRecomendados =
        productos.filter((p) =>
          ids.includes(p._id.toString())
        )
        .map((p) => ({
          _id: p._id,
          nombre: p.nombre,
          precio: p.precio,
          imagen: p.imagen || null,
          categoria: p.categoria,
          stock: p.stock || 0,
        }));

    }

    // 🔥 FALLBACK AUTOMÁTICO
    // Si la IA falla → mostramos productos igual
    if (
      productosRecomendados.length === 0
    ) {

      productosRecomendados =
        productosFiltrados
          .slice(0, 3)
          .map((p) => ({
            _id: p._id,
            nombre: p.nombre,
            precio: p.precio,
            imagen: p.imagen || null,
            categoria: p.categoria,
            stock: p.stock || 0,
          }));

    }

    // 🔥 RESPUESTA FINAL
    return res.json({
      respuesta: mensajeTexto,
      productos: productosRecomendados,
    });

  } catch (error) {

    console.log(
      "❌ IA ERROR:",
      error.message
    );

    return res.status(500).json({
      msg: "Error IA",
    });

  }
};