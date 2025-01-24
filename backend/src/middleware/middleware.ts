import { check, body, param } from "express-validator";

export const userRegisterCheckMiddleware = [
  check("firstName", "First Name is required.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name mustbe between 3 and 20 characters"),
  check("lastName", "Last Name is required.")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name mustbe between 3 and 20 characters"),
  check("email", "email is required.")
    .isEmail()
    .withMessage("Please enter a valid email"),
  check("password", "Password is required.")
    .isLength({ min: 6, max: 20 })
    .withMessage("Password mustbe between 6 and 20 characters"),
];

export const userLoginCheckMiddleware = [
  check("email", "email is required.")
    .isEmail()
    .withMessage("Please enter a valid email"),
  check("password", "Password is required."),
];

export const validateHotelData = [
  body("name")
    .isString()
    .withMessage("Name must be a string.")
    .notEmpty()
    .withMessage("Name is required."),

  body("city")
    .isString()
    .withMessage("City must be a string.")
    .notEmpty()
    .withMessage("City is required."),

  body("country")
    .isString()
    .withMessage("Country must be a string.")
    .notEmpty()
    .withMessage("Country is required."),

  body("description")
    .isString()
    .withMessage("Description must be a string.")
    .notEmpty()
    .withMessage("Description is required."),

  body("type")
    .isString()
    .withMessage("Type must be a string.")
    .notEmpty()
    .withMessage("Type is required."),

  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required."),
  body("pricePerNight")
    .isNumeric()
    .withMessage("Price per night must be a non-negative number.")
    .notEmpty()
    .withMessage("Price per night is required."),

];


export const validateHotelId=[param("id").notEmpty().withMessage("Hotel Id is required.")]
