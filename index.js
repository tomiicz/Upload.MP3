const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const app = express();

app.use(cors());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads")); // Enlaces públicos

// Configurar almacenamiento con Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const name = Date.now() + ext;
    cb(null, name);
  }
});

const upload = multer({ storage: storage });

// Ruta para subir archivos
app.post("/upload", upload.single("file"), (req, res) => {
  const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
  res.json({ success: true, url: fileUrl });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});