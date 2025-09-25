const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const app = express();
app.use(cors());
app.use(express.static("public"));

// Configurar Cloudinary desde variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Configurar Multer con Cloudinary como almacenamiento
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // carpeta dentro de tu cuenta de Cloudinary
    resource_type: "auto" // permite subir imágenes, audios, etc.
  }
});

const upload = multer({ storage: storage });

// Ruta para subir archivo
app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = req.file.path;
  res.json({ success: true, url: fileUrl });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});