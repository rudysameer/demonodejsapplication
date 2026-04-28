import { Request, Response } from "express";
import { sendSuccess } from "../utils/response";

// GET /api/health
export const healthCheck = (_req: Request, res: Response): void => {
    sendSuccess(res, {
        status: "ok",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
        version: "1.0.0",
    }, "Server is healthy");
};
