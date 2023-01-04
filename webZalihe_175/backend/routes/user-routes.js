import express from "express";
import {
  getAllUser,
  login,
  signup,
  getById,
  updateUser,
} from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
router.post("/uredi/:id", updateUser);
router.get("/:id", getById);

export default router;
