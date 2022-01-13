import { validationResult } from "express-validator";
import User from "../models/user.js";

export const getContacts = async (req, res) => {
  // validate inputs
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(422).send({
      message: "Invalid Inputs",
    });

  // get email
  const { email } = req.body;

  //   find user
  let user;
  let contacts;
  try {
    user = await User.findOne({ email: email });
    contacts = await user.contacts;
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: "Server Error",
    });
  }

  res.status(201).json({
    contacts,
  });
};
