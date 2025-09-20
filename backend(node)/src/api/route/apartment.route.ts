import { Router } from "express";
import ApartmentController from "../controller/apartment.controller";
import { apartmentValidation } from "../validation/apartment.validation";

const router = Router();
const apartmentController = new ApartmentController();

// ✅ Create apartment
router.post("/", apartmentValidation(), apartmentController.createApartment);

// ✅ Get all apartments (with pagination ?page=1&limit=10)
router.get("/", apartmentController.getAllApartments);

// ✅ Get apartment by id
router.get("/:id", apartmentController.getApartmentById);

export default router;
