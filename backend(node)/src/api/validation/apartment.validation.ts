import { body } from "express-validator";
import { handleValidationErrors } from ".";

export const apartmentValidation = () => [
  body("title")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .isString()
    .withMessage("Description must be a string")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description must be between 10 and 1000 characters"),

  body("price")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("bedrooms")
    .isInt({ min: 0 })
    .withMessage("Bedrooms must be a non-negative integer"),

  body("bathrooms")
    .isInt({ min: 0 })
    .withMessage("Bathrooms must be a non-negative integer"),

  body("size")
    .isFloat({ min: 0 })
    .withMessage("Size must be a positive number"),

  body("location")
    .isString()
    .withMessage("Location must be a string")
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Location must be between 2 and 100 characters"),

  body("unitNumber")
    .optional()
    .isString()
    .withMessage("Unit number must be a string")
    .trim()
    .isLength({ max: 50 })
    .withMessage("Unit number must not exceed 50 characters"),

  body("project")
    .optional()
    .isString()
    .withMessage("Project name must be a string")
    .trim()
    .isLength({ max: 100 })
    .withMessage("Project name must not exceed 100 characters"),

  body("amenities")
    .optional()
    .isArray()
    .withMessage("Amenities must be an array of strings"),

  body("floor")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Floor must be a non-negative integer"),

  body("yearBuilt")
    .optional()
    .isInt({ min: 1800, max: new Date().getFullYear() })
    .withMessage("Year built must be a valid year"),

  body("isAvailable")
    .isBoolean()
    .withMessage("Availability must be true or false"),

  body("imageUrl")
    .optional()
    .isURL()
    .withMessage("Image URL must be a valid URL"),

  handleValidationErrors,
];
