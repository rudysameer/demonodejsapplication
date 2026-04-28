import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Demo Node.js CMS API",
            version: "1.0.0",
            description:
                "Sample Node.js + TypeScript + TypeORM REST API for GitHub Actions testing",
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: "Local development server",
            },
        ],
        tags: [
            { name: "Health", description: "Server health check" },
            { name: "Users", description: "User management" },
            { name: "Posts", description: "Post management" },
        ],
        components: {
            schemas: {
                User: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        name: { type: "string", example: "John Doe" },
                        email: { type: "string", example: "john@example.com" },
                        isActive: { type: "boolean", example: true },
                        createdAt: { type: "string", format: "date-time" },
                    },
                },
                CreateUser: {
                    type: "object",
                    required: ["name", "email", "password"],
                    properties: {
                        name: { type: "string", example: "John Doe" },
                        email: { type: "string", example: "john@example.com" },
                        password: { type: "string", example: "secret123" },
                    },
                },
                Post: {
                    type: "object",
                    properties: {
                        id: { type: "integer", example: 1 },
                        title: { type: "string", example: "Hello World" },
                        body: { type: "string", example: "My first post content" },
                        published: { type: "boolean", example: false },
                        createdAt: { type: "string", format: "date-time" },
                    },
                },
                CreatePost: {
                    type: "object",
                    required: ["title", "body"],
                    properties: {
                        title: { type: "string", example: "Hello World" },
                        body: { type: "string", example: "My first post content" },
                        published: { type: "boolean", example: false },
                    },
                },
                ApiResponse: {
                    type: "object",
                    properties: {
                        success: { type: "boolean" },
                        message: { type: "string" },
                        data: {},
                    },
                },
            },
        },
        paths: {
            "/api/health": {
                get: {
                    tags: ["Health"],
                    summary: "Server health check",
                    responses: {
                        "200": {
                            description: "Server is healthy",
                            content: {
                                "application/json": {
                                    schema: {
                                        allOf: [
                                            { $ref: "#/components/schemas/ApiResponse" },
                                            {
                                                properties: {
                                                    data: {
                                                        type: "object",
                                                        properties: {
                                                            status: { type: "string", example: "ok" },
                                                            timestamp: {
                                                                type: "string",
                                                                format: "date-time",
                                                            },
                                                            environment: {
                                                                type: "string",
                                                                example: "development",
                                                            },
                                                            version: { type: "string", example: "1.0.0" },
                                                        },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
            "/api/users": {
                get: {
                    tags: ["Users"],
                    summary: "Get all users",
                    responses: {
                        "200": {
                            description: "List of users",
                            content: {
                                "application/json": {
                                    schema: {
                                        allOf: [
                                            { $ref: "#/components/schemas/ApiResponse" },
                                            {
                                                properties: {
                                                    data: {
                                                        type: "array",
                                                        items: { $ref: "#/components/schemas/User" },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ["Users"],
                    summary: "Create a new user",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/CreateUser" },
                            },
                        },
                    },
                    responses: {
                        "201": { description: "User created successfully" },
                        "400": { description: "Validation error" },
                        "409": { description: "Email already in use" },
                    },
                },
            },
            "/api/users/{id}": {
                get: {
                    tags: ["Users"],
                    summary: "Get user by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: { type: "integer" },
                        },
                    ],
                    responses: {
                        "200": { description: "User found" },
                        "404": { description: "User not found" },
                    },
                },
                delete: {
                    tags: ["Users"],
                    summary: "Delete user by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: { type: "integer" },
                        },
                    ],
                    responses: {
                        "200": { description: "User deleted" },
                        "404": { description: "User not found" },
                    },
                },
            },
            "/api/posts": {
                get: {
                    tags: ["Posts"],
                    summary: "Get all posts",
                    responses: {
                        "200": {
                            description: "List of posts",
                            content: {
                                "application/json": {
                                    schema: {
                                        allOf: [
                                            { $ref: "#/components/schemas/ApiResponse" },
                                            {
                                                properties: {
                                                    data: {
                                                        type: "array",
                                                        items: { $ref: "#/components/schemas/Post" },
                                                    },
                                                },
                                            },
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ["Posts"],
                    summary: "Create a new post",
                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: { $ref: "#/components/schemas/CreatePost" },
                            },
                        },
                    },
                    responses: {
                        "201": { description: "Post created successfully" },
                        "400": { description: "Validation error" },
                    },
                },
            },
            "/api/posts/{id}": {
                get: {
                    tags: ["Posts"],
                    summary: "Get post by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: { type: "integer" },
                        },
                    ],
                    responses: {
                        "200": { description: "Post found" },
                        "404": { description: "Post not found" },
                    },
                },
                delete: {
                    tags: ["Posts"],
                    summary: "Delete post by ID",
                    parameters: [
                        {
                            in: "path",
                            name: "id",
                            required: true,
                            schema: { type: "integer" },
                        },
                    ],
                    responses: {
                        "200": { description: "Post deleted" },
                        "404": { description: "Post not found" },
                    },
                },
            },
        },
    },
    apis: [], // spec is inline above, no JSDoc scanning needed
};

export const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Also expose raw JSON spec
    app.get("/api-docs.json", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
};
