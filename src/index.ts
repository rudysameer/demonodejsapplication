import "reflect-metadata";
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { AppDataSource } from "./config/data-source";
import healthRouter from "./routes/health.route";
import userRouter from "./routes/user.route";
import postRouter from "./routes/post.route";
import { setupSwagger } from "./config/swagger";

const app = express();
const PORT = parseInt(process.env.PORT || "3000");

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/health", healthRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);

// ─── Swagger UI ──────────────────────────────────────────────────────────────
setupSwagger(app);

// 404 fallback
app.use((_req, res) => {
    res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Bootstrap ───────────────────────────────────────────────────────────────
const bootstrap = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Database connected");

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📋 Environment: ${process.env.NODE_ENV || "development"}`);
            console.log(`📚 Swagger UI:   http://localhost:${PORT}/api-docs`);
        });
    } catch (err) {
        console.error("❌ Failed to start server:", err);
        process.exit(1);
    }
};

void bootstrap();
