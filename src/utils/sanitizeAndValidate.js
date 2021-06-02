import { check, validationResult } from "express-validator";

export const validateSignup = [
  check("about").not().isEmpty().withMessage("About cannot be empty"),
  check("name")
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ max: 15 })
    .withMessage("Max length is 15 characters.")
    .isAlphanumeric()
    .withMessage("Cannot contain special characters or numbers"),

  check("email")
    .not()
    .isEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Not a valid email"),

  check("password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must have atleast 6 cracters"),
];

export const validateLogin = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Email cannot be empty")
    .isEmail()
    .withMessage("Not a valid email"),

  check("password")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 6 })
    .withMessage("Password must have atleast 6 cracters"),
];

export const isRequestValidate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
