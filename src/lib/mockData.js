// src/lib/mockData.js
export const productosInventados = [
  {
    id: "PTU-001",
    nombre: "Amigurumi Conejito Dormilón",
    categoria: "Amigurumis",
    personalizable: true,
    colores: ["Rosa Pastel", "Blanco", "Lila"],
    descripcion:
      "Tierno conejito tejido a mano, perfecto para regalar o decorar tu habitación.",
    detalles: {
      medidas: "15 cm de alto",
      hilo: "Algodón premium",
      aguja: "2.5 mm",
    },
  },
  {
    id: "PTU-002",
    nombre: "Bolso Tejido Primaveral",
    categoria: "Bolsos",
    personalizable: false,
    colores: [],
    descripcion:
      "Bolso resistente ideal para el día a día, con asas reforzadas.",
    detalles: { medidas: "30x25 cm", hilo: "Macramé", aguja: "4 mm" },
  },
  {
    id: "PTU-003",
    nombre: "Llavero Osito Corazón",
    categoria: "Llaveros",
    personalizable: true,
    colores: ["Rojo", "Rosa", "Azul"],
    descripcion:
      "Pequeño detalle para llevar a todos lados y alegrar tus llaves.",
    detalles: { medidas: "5 cm", hilo: "Algodón", aguja: "2 mm" },
  },
  {
    id: "PTU-004",
    nombre: "Monedero Nube",
    categoria: "Monederos",
    personalizable: true,
    colores: ["Celeste", "Blanco", "Rosa"],
    descripcion: "Suave monedero con cierre, forma de nube esponjosa.",
    detalles: { medidas: "10x8 cm", hilo: "Algodón", aguja: "3 mm" },
  },
  {
    id: "PTU-005",
    nombre: "Mochila Koala Explorador",
    categoria: "Mochilas",
    personalizable: false,
    colores: [],
    descripcion:
      "Mochila tejida con orejitas de koala, ideal para los más pequeños.",
    detalles: { medidas: "25x30 cm", hilo: "Lana acrílica", aguja: "5 mm" },
  },
  {
    id: "PTU-006",
    nombre: "Ramo de Tulipanes Eternos",
    categoria: "Ramos",
    personalizable: true,
    colores: ["Rojo", "Amarillo", "Morado", "Blanco"],
    descripcion: "Ramo de tulipanes tejidos que nunca se marchitarán.",
    detalles: { medidas: "30 cm de alto", hilo: "Algodón", aguja: "2.5 mm" },
  },
  {
    id: "PTU-007",
    nombre: "Peluche Dragón Mágico",
    categoria: "Peluches",
    personalizable: true,
    colores: ["Verde", "Morado", "Azul"],
    descripcion:
      "Un dragón tierno y suave, listo para acompañarte en tus aventuras.",
    detalles: { medidas: "40 cm", hilo: "Peluche gigante", aguja: "6 mm" },
  },
  {
    id: "PTU-008",
    nombre: "Muñeca Lolita",
    categoria: "Muñecas",
    personalizable: true,
    colores: ["Rubio", "Castaño", "Pelirrojo"],
    descripcion:
      "Muñeca tejida con vestido de encaje y cabello personalizable.",
    detalles: { medidas: "25 cm", hilo: "Algodón", aguja: "2 mm" },
  },
];

export const categorias = [
  "Bolsos",
  "Mochilas",
  "Monederos",
  "Ramos",
  "Amigurumis",
  "Peluches",
  "Llaveros",
  "Muñecas",
];
