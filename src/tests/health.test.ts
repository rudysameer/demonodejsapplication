import request from "supertest";
import express from "express";
import healthRouter from "../routes/health.route";

const app = express();
app.use("/api/health", healthRouter);

describe("Health API", () => {
  it("should return server health", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});