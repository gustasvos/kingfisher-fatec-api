import express, { Request } from "express";
// 💡 Correção: Garante que listarUploadsBack está importado
import { handleFormSubmit, listarUploadsBack, listarCSV } from "../controllers/formController"; 
import { setUploadTimestamp } from "../../middlewares/setUploadTimestamp"
import { upload } from "../../services/uploadService";

const router = express.Router();

// Usamos 'upload.any()' para que o Multer capture todos os arquivos, 
// independentemente do nome do campo, e os passe para o controller em req.files.
router.post('/submit', setUploadTimestamp, upload.any(), handleFormSubmit);
router.get("/listar-uploads", listarUploadsBack)
router.get("/ver-csv", listarCSV)

export default router;
