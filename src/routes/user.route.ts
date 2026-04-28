import { Router } from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
} from "../controllers/user.controller";

const router = Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.delete("/:id", deleteUser);

export default router;
