// uploadFile.js

import multer from "multer";
import fs from "fs";
import path from "path";

class FileUploader {
  constructor() {
    this.uploadPath = process.env.FILE_UPLOAD_PATH;

    // Crear directorio si no existe
    if (!fs.existsSync(this.uploadPath)) {
      fs.mkdirSync(this.uploadPath, { recursive: true });
    }

    // Configuración del almacenamiento
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, this.uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
      },
    });

    // Validar tipo de archivo (opcional)
    this.fileFilter = (req, file, cb) => {
      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/jpg",
      ];
      if (!allowedTypes.includes(file.mimetype)) {
        return cb(new Error("Tipo de archivo no permitido."), false);
      }
      cb(null, true);
    };

    // Middleware final
    this.upload = multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB máximo
      },
    });
  }
}

export default new FileUploader();
