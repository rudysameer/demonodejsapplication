# Demo Node.js CMS Backend

A sample Node.js + TypeScript + TypeORM backend for testing GitHub Actions workflows.

## Tech Stack
- **Node.js** + **TypeScript**
- **Express** — REST API framework
- **TypeORM** — ORM with migration support
- **PostgreSQL** — Database

## Project Structure

```
src/
├── config/         # TypeORM DataSource config
├── controllers/    # Route handlers
├── entities/       # TypeORM entities (User, Post)
├── migrations/     # TypeORM migration files
├── routes/         # Express routers
└── utils/          # Shared utilities (response helper)
```

## Getting Started

### 1. Setup environment
```bash
cp .env.example .env
# Edit .env with your PostgreSQL credentials
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run migrations
```bash
npm run migration:run
```

### 4. Start development server
```bash
npm run dev
```

## Migration Commands

| Command | Description |
|---|---|
| `npm run migration:run` | Apply all pending migrations |
| `npm run migration:revert` | Revert the last migration |
| `npm run migration:show` | Show migration status |
| `npm run migration:generate -- src/migrations/MigrationName` | Auto-generate migration from entity diff |

## API Endpoints

### Health
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users` | Get all users |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create a user |
| DELETE | `/api/users/:id` | Delete a user |

### Posts
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/posts` | Get all posts |
| GET | `/api/posts/:id` | Get post by ID |
| POST | `/api/posts` | Create a post |
| DELETE | `/api/posts/:id` | Delete a post |

### Example: Create a User
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"secret"}'
```

### Example: Create a Post
```bash
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello World","body":"My first post","published":true}'
```

## Build for Production
```bash
npm run build
npm start
```
