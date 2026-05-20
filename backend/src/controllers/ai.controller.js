import axios from "axios";
import Producto from "../models/producto.model.js";

export const chatIA = async (req, res) => {
  try {
    const { mensaje } = req.body;

    const productos = await Producto.find().lean();

    const productosTexto = productos
      .slice(0, 30)
      .map((p) => `${p._id} | ${p.nombre} | ${p.categoria} | ${p.precio}`)
      .join("\n");

    const prompt = `
Eres "ShopMind IA", un asistente de compras para una tienda online.

🚨 REGLAS OBLIGATORIAS:
- SOLO puedes usar productos del catálogo.
- NO inventes productos, precios ni categorías.
- Máximo 3 productos por respuesta.
- Si no existe el producto: responde solo con el mensaje, sin IDs.
- NO actúes como chatbot general.

📦 FORMATO DE SALIDA OBLIGATORIO (responde EXACTAMENTE así, sin cambiar nada):

MENSAJE: (texto corto explicando la recomendación)
IDS: id1,id2,id3

Ejemplo real:
MENSAJE: Aquí tienes unas buenas opciones de snacks.
IDS: 6a03d944130efcdd7348d614,6a03d944130efcdd7348d615

📚 CATÁLOGO:
${productosTexto}

👤 USUARIO:
${mensaje}
`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.2:3b",
        prompt,
        stream: false,
      }
    );

    const raw = response.data.response.replace(/\r/g, "").trim();
    console.log("RAW IA RESPONSE:", raw);

    // Extraer MENSAJE
    const mensajeMatch = raw.match(/MENSAJE:\s*(.+)/);
    const mensajeTexto = mensajeMatch
      ? mensajeMatch[1].trim()
      : "Aquí tienes mis recomendaciones.";

    // Extraer IDS
    const idsMatch = raw.match(/IDS:\s*([a-f0-9,\s]+)/i);
    let productosRecomendados = [];

    if (idsMatch) {
      const ids = idsMatch[1]
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean);

      productosRecomendados = productos
        .filter((p) => ids.includes(p._id.toString()))
        .map((p) => ({
            _id: p._id,
            nombre: p.nombre,
            precio: p.precio,
            imagen: p.imagen || null,
            categoria: p.categoria,
        }));
    }

    return res.json({
      respuesta: mensajeTexto,
      productos: productosRecomendados,
    });

  } catch (error) {
    console.log("❌ IA ERROR:", error.message);
    return res.status(500).json({ msg: "Error IA" });
  }
};