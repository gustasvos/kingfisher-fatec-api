import express, { Request } from "express";
import { handleFormSubmit, listarUploadsBack, listarCSV } from "../controllers/formController";
import { setUploadTimestamp } from "../../middlewares/setUploadTimestamp"
import { upload } from "../../services/uploadService";

const router = express.Router();

router.post('/submit', setUploadTimestamp, upload.array('images', 5), handleFormSubmit);
router.get("/listar-uploads", listarUploadsBack)
router.get("/ver-csv", listarCSV)

export default router;
