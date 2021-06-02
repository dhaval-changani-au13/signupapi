import express from "express";
import multer from "multer";
const router = express.Router();
import auth from "../middlewares/auth";
import { Signup, Login, Profile } from "../controller/authControler";
import {
  validateSignup,
  isRequestValidate,
  validateLogin,
} from "../utils/sanitizeAndValidate";

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/img");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});
const uplode = multer({
  storage: diskStorage,
});

router.post(
  "/signup",
  uplode.single("image"),
  validateSignup,
  isRequestValidate,
  Signup
);

router.post("/login", validateLogin, isRequestValidate, Login);

router.get("/profile", auth, Profile);

export default router;
