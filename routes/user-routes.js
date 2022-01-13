import { Router } from "express";
import { check } from "express-validator";

import {
  getUsers,
  getUser,
  signup,
  login,
  getContacts,
  addNewContact,
} from "../controllers/user-controller.js";

const router = Router();

const passLength = 6;

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: passLength }),
  ],
  signup
);

router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: passLength }),
  ],
  login
);
router.post("/contacts", [check("email").not().isEmpty()], getContacts);

router.post(
  "/contacts/addcontact",
  [check("email").not().isEmpty()],
  addNewContact
);

router.post("/", [check("userId").not().isEmpty()], getUser);

router.get("/", getUsers);

export default router;
