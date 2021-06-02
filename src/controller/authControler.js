import bcrypt from "bcrypt";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import userSchema from "../models/schemas/userSchema";
import { hash } from "../utils/hashPass";

export const Signup = async (req, res) => {
  try {
    const { email, name, password, about } = req.body;
    const image = req.file;
    if (!image) {
      return res.status(400).json({
        data: {},
        errors: [
          {
            value: req.file.path,
            msg: "image field cannot be empty",
            param: "image",
            location: "file",
          },
        ],
      });
    }
    if (image.size > 500000) {
      console.log(image.size);
      return res.status(400).json({
        data: {},
        errors: [
          {
            value: req.file.size,
            msg: "image size must be less then 500kb",
            param: "image",
            location: "file",
          },
        ],
      });
    }
    let user = await userSchema.find({ email: email });
    if (user.length) {
      return res.status(400).json({
        data: {},
        errors: [
          {
            value: req.body.email,
            msg: "User already exists.",
            param: "email",
            location: "body",
          },
        ],
        message: "Unable to create user",
      });
    }

    const hashPassword = await hash(password, 10);
    user = new userSchema({
      email,
      name,
      about,
      image: image.path,
      password: hashPassword,
    });
    await user.save();
    res.status(200).json({
      data: {},
      errors: [],
      message: "Signed Up successfully!!",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userSchema.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        data: {},
        errors: [
          {
            value: email,
            msg: "User not exist.",
            param: "email",
            location: "body",
          },
        ],
        message: "Invalid credentials",
      });
    }

    const matchPassword = bcrypt.compareSync(password, user.password);
    if (!matchPassword) {
      return res.status(400).json({
        data: {},
        errors: [
          {
            value: password,
            msg: "Invalid password !",
            params: "password",
            location: "body",
          },
        ],
        message: "Invalid credentials",
      });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.jwt_secret, {
        expiresIn: "1d",
      });
      res.status(200).json({
        data: { token },
        errors: [],
        message: "Login successfully!",
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const Profile = async (req, res) => {
  const { name, email, about, image } = req.user;
  // console.log(image);
  try {
    res.status(200).json({
      data: { name, email, about, image },
      errors: [],
      message: "Fetched data form user",
    });
  } catch (err) {
    console.log(err.message);
  }
};
