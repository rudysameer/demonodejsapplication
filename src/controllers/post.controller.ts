import { Request, Response } from "express";
import { AppDataSource } from "../config/data-source";
import { Post } from "../entities/Post";
import { sendError, sendSuccess } from "../utils/response";

const postRepo = () => AppDataSource.getRepository(Post);

// GET /api/posts
export const getAllPosts = async (_req: Request, res: Response): Promise<void> => {
    try {
        const posts = await postRepo().find({
            relations: ["author"],
            order: { createdAt: "DESC" },
        });
        sendSuccess(res, posts, "Posts fetched successfully");
    } catch (err) {
        sendError(res, "Failed to fetch posts");
    }
};

// GET /api/posts/:id
export const getPostById = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await postRepo().findOne({
            where: { id: parseInt(req.params.id) },
            relations: ["author"],
        });
        if (!post) {
            sendError(res, "Post not found", 404);
            return;
        }
        sendSuccess(res, post, "Post fetched successfully");
    } catch (err) {
        sendError(res, "Failed to fetch post");
    }
};

// POST /api/posts
export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, body, published } = req.body as {
            title: string;
            body: string;
            published?: boolean;
        };

        if (!title || !body) {
            sendError(res, "title and body are required", 400);
            return;
        }

        const post = postRepo().create({ title, body, published: published ?? false });
        await postRepo().save(post);
        sendSuccess(res, post, "Post created successfully", 201);
    } catch (err) {
        sendError(res, "Failed to create post");
    }
};

// DELETE /api/posts/:id
export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await postRepo().findOne({
            where: { id: parseInt(req.params.id) },
        });
        if (!post) {
            sendError(res, "Post not found", 404);
            return;
        }
        await postRepo().remove(post);
        sendSuccess(res, null, "Post deleted successfully");
    } catch (err) {
        sendError(res, "Failed to delete post");
    }
};
