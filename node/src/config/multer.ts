import multer from "multer";
import path from "path";
import crypto from "crypto";

export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads", "images"),
    filename(req, file, callback) {
      const hash = crypto.randomBytes(6).toString("hex");

      const fileName = `${hash}-${file.originalname}`;

      // Podemos utilizar fileFilter para filtrar o tipo de arquivo
      // parametros = erro, nomedo arquivo
      callback(null, fileName);
    },
  }),
};
