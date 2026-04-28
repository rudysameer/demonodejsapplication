import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
import { sendError, sendSuccess } from "../utils/response";

const userRepo = () => AppDataSource.getRepository(User);

// GET /api/users
export const getAllUsers = async (_req: Request, res: Response): Promise<void> => {
    try {
        const users = await userRepo().find({
            select: ["id", "name", "email", "isActive", "createdAt"],
        });
        sendSuccess(res, users, "Users fetched successfully");
    } catch (err) {
        sendError(res, "Failed to fetch users");
    }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userRepo().findOne({
            where: { id: parseInt(req.params.id) },
            select: ["id", "name", "email", "isActive", "createdAt"],
        });
        if (!user) {
            sendError(res, "User not found", 404);
            return;
        }
        sendSuccess(res, user, "User fetched successfully");
    } catch (err) {
        sendError(res, "Failed to fetch user");
    }
};

// POST /api/users
export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body as {
            name: string;
            email: string;
            password: string;
        };

        if (!name || !email || !password) {
            sendError(res, "name, email and password are required", 400);
            return;
        }

        const existing = await userRepo().findOne({ where: { email } });
        if (existing) {
            sendError(res, "Email already in use", 409);
            return;
        }

        const user = userRepo().create({ name, email, password });
        await userRepo().save(user);

        sendSuccess(
            res,
            { id: user.id, name: user.name, email: user.email },
            "User created successfully",
            201
        );
    } catch (err) {
        sendError(res, "Failed to create user");
    }
};

// DELETE /api/users/:id
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await userRepo().findOne({
            where: { id: parseInt(req.params.id) },
        });
        if (!user) {
            sendError(res, "User not found", 404);
            return;
        }
        await userRepo().remove(user);
        sendSuccess(res, null, "User deleted successfully");
    } catch (err) {
        sendError(res, "Failed to delete user");
    }
};
