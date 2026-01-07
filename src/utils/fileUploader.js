// fileUploader.js

import multer from "multer";
import fs from "fs";
import path from "path";
import sharp from "sharp";

class FileUploader {
  constructor() {
    this.uploadPath = "src/uploads/";

    // Crear carpeta si no existe
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }

    // Tamaños por tipo
    this.sizes = {
      product: 200,
      post: 800,
      avatar: 300,
    };

    // Configuración del storage
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadPath);
      },

      filename: (req, file, cb) => {
        // ⬅️ MISMA NORMA QUE TU MIDDLEWARE ANTERIOR
        const ext = path.extname(file.originalname);
        const finalName = `${Date.now()}${ext}`;
        cb(null, finalName);
      },
    });

    this.fileFilter = (req, file, cb) => {
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
      if (!allowed.includes(file.mimetype)) {
        return cb(new Error("Tipo de archivo no permitido"), false);
      }
      cb(null, true);
    };

    this.multerUpload = multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: { fileSize: 5 * 1024 * 1024 },
    });
  }

  /**
   * Middleware dinámico: resize por tipo
   */
  uploadAndResize() {
    return (req, res, next) => {
      this.multerUpload.single("file")(req, res, async (err) => {
        if (err) return next(err);
        if (!req.file) return next();

        // Obtener tipo (url o body)
        const type = req.params.type || req.body.type || "post";
        const width = this.sizes[type] || 800;

        const inputPath = req.file.path;
        const tempPath = `${req.file.path}-tmp${path.extname(
          req.file.filename
        )}`;

        try {
          // Procesar imagen → archivo temporal
          await sharp(inputPath)
            .resize({
              width,
              withoutEnlargement: true,
            })
            .jpeg({ quality: 80 })
            .toFile(tempPath);

          // Reemplazar original
          fs.unlinkSync(inputPath);
          fs.renameSync(tempPath, inputPath);

          next();
        } catch (error) {
          console.error("Error procesando imagen:", error);
          next(error);
        }
      });
    };
  }
}

export default new FileUploader();
