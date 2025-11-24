// src/app.js

require("dotenv").config(); // Carga las variables de entorno
const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
// DB INSTANCE
const connectDB = require("./utils/mongo");
// ROUTES
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
//CONFIG
dotenv.config();
connectDB();

// Configura CORS para permitir solo tu frontend
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://asoporkmag.com",
    "https://www.asoporkmag.com",
    "https://asoporkmag.com.co",
    "https://www.asoporkmag.com.co",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Middleware para procesar JSON en las solicitudes
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// SERVE STATIC FILES
const uploadsPath = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsPath));

// DEFINE ROUTES V1
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/post", postRoutes);

app.get("/healtcheck", (req, res) => {
  res.status(200).json({ status: "OK" });
});

//RUN SERVER
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
