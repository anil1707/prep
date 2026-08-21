# Docker — Complete Notes

## Overview

Docker packages an application together with the dependencies and runtime it needs so it can run consistently across environments.

```text
Application Code
      ↓
Dockerfile
      ↓
Docker Image
      ↓
Docker Container
      ↓
Docker Network / Volumes / Environment
      ↓
Docker Compose for multiple services
```

---

# Module 1 — Docker Fundamentals

## What is Docker?

Docker is a platform for packaging and running applications in isolated environments called **containers**.

## Why do we need Docker?

- Consistent environments
- Dependency isolation
- Reproducible deployments
- Easier application setup
- Faster deployment
- Microservice isolation
- CI/CD workflows
- Easier scaling

## Image

An image is a packaged, read-only template used to create containers.

```text
Dockerfile → Image → Container
```

## Container

A container is a running instance of an image.

Important principle:

> Containers should generally be treated as disposable.

## Image vs Container

| Image | Container |
|---|---|
| Template | Running instance |
| Read-only | Has a writable container layer |
| Used to create containers | Runs the application |
| Can be shared | Can be started/stopped/deleted |

---

# Module 2 — Important Docker Commands

## Docker information

```bash
docker --version
docker info
```

## Images

```bash
docker search node
docker pull node
docker pull node:22-alpine
docker images
docker image ls
docker rmi <image>
```

## Containers

```bash
docker run node
docker run -d node
docker run -d --name my-node node
docker ps
docker ps -a
docker stop my-node
docker start my-node
docker restart my-node
docker rm my-node
docker rm -f my-node
```

## Logs and debugging

```bash
docker logs my-node
docker logs -f my-node
docker exec -it my-node sh
docker inspect my-node
```

---

# Module 3 — Dockerfile

A Dockerfile describes how to build a Docker image.

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

## Important instructions

### FROM

```dockerfile
FROM node:22-alpine
```

Defines the base image.

### WORKDIR

```dockerfile
WORKDIR /app
```

Sets the working directory.

### COPY

```dockerfile
COPY package*.json ./
```

Copies files into the image.

### RUN

```dockerfile
RUN npm ci
```

Runs a command during image building.

### EXPOSE

```dockerfile
EXPOSE 5000
```

Documents the application's container port. It does not publish the port to the host.

### CMD

```dockerfile
CMD ["npm", "start"]
```

Defines the default command when the container starts.

---

# Module 4 — Building Images

Build an image:

```bash
docker build -t my-node-app .
```

Run it:

```bash
docker run -d --name node-api my-node-app
```

Publish a port:

```bash
docker run -d   --name node-api   -p 3000:5000   my-node-app
```

```text
Browser
   ↓
localhost:3000
   ↓
Container:5000
```

---

# Module 5 — Image Layers and Build Cache

Dockerfiles are built in layers.

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "start"]
```

Conceptually:

```text
Layer 1 → Base Node image
Layer 2 → WORKDIR
Layer 3 → package files
Layer 4 → npm ci
Layer 5 → Application source
Layer 6 → CMD metadata
```

## Important optimization

Prefer:

```dockerfile
COPY package*.json ./
RUN npm ci

COPY . .
```

rather than copying the entire project before installing dependencies.

This lets Docker reuse the dependency layer when only application source changes.

## Build without cache

```bash
docker build --no-cache -t my-node-app .
```

---

# Module 6 — Production Dockerfile

Production images should generally be:

- Small
- Secure
- Reproducible
- Fast to build
- Fast to start
- Free from unnecessary development dependencies

Example:

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

## Production practices

Use a specific base image:

```dockerfile
FROM node:22-alpine
```

Install production dependencies only:

```bash
npm ci --omit=dev
```

Don't put secrets in the image.

Avoid:

```dockerfile
ENV MONGO_PASSWORD=secret
```

Use runtime environment variables or a secret-management solution.

Use `.dockerignore`.

---

# Module 7 — Multi-Stage Builds

Multi-stage builds use separate build and production stages.

```dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

CMD ["node", "dist/server.js"]
```

Benefits:

- Smaller final image
- Build tools don't need to remain in production
- Cleaner production environment

---

# Module 8 — Docker Volumes

Containers are disposable. Important data should survive container replacement.

```text
Container
   ↓
Volume
   ↓
Persistent data
```

## Create

```bash
docker volume create mongo-data
```

## List

```bash
docker volume ls
```

## Inspect

```bash
docker volume inspect mongo-data
```

## Remove

```bash
docker volume rm mongo-data
```

## Mount

```bash
docker run -d   --name mongodb   -v mongo-data:/data/db   mongo
```

MongoDB stores its database data under `/data/db`.

## Volume is not only for development

Volumes can be used in production when you self-host stateful services or need Docker-managed persistent filesystem storage.

But if production uses managed services:

```text
MongoDB Atlas
S3/Object Storage
Managed Redis
Cloud logging
```

you may not need Docker volumes for those services.

For example:

```text
Development:
Node.js Container → MongoDB Container → Docker Volume

Production:
Node.js Container → MongoDB Atlas
```

## Named volume vs bind mount

Named volume:

```bash
-v mongo-data:/data/db
```

Bind mount:

```bash
-v ./src:/app/src
```

Bind mounts are especially common for local development.

---

# Module 9 — Docker Networking

Docker networking allows containers to communicate.

## Commands

```bash
docker network ls
docker network create my-network
docker network inspect my-network
docker network connect my-network node-api
docker network disconnect my-network node-api
docker network rm my-network
```

---

# Module 10 — Bridge Network

A bridge network allows containers on the same network to communicate.

```text
             Docker Network
                  |
        +---------+---------+
        |                   |
        ↓                   ↓
    Node.js              MongoDB
```

Run MongoDB:

```bash
docker run -d   --name mongodb   --network my-network   mongo
```

Run Node.js:

```bash
docker run -d   --name node-api   --network my-network   my-node-api
```

---

# Module 11 — `localhost` in Docker

Inside a Node.js container:

```text
localhost
```

means the Node.js container itself.

This is wrong when MongoDB is in another container:

```env
MONGO_URI=mongodb://localhost:27017/mydb
```

Use the container/service name:

```env
MONGO_URI=mongodb://mongodb:27017/mydb
```

Docker's internal DNS resolves:

```text
mongodb
   ↓
MongoDB container
```

Container-to-container:

```text
Node.js
   ↓
mongodb:27017
   ↓
MongoDB
```

---

# Module 12 — Port Publishing

```bash
-p 3000:5000
```

means:

```text
Host port 3000
       ↓
Container port 5000
```

So:

```text
Browser
   ↓
localhost:3000
   ↓
Node.js Container:5000
```

## Important distinction

Container → Container:

```text
mongodb:27017
```

Host → Container:

```text
localhost:3000
```

The latter requires published ports.

---

# Module 13 — Docker Compose

Docker Compose defines and runs multi-container applications.

Without Compose:

```bash
docker network create ...
docker run ...
docker run ...
docker run ...
```

With Compose:

```bash
docker compose up
```

Example:

```yaml
services:

  api:
    build: .

  mongodb:
    image: mongo
```

A **service** represents a component of the application.

```yaml
services:
  api:
  mongodb:
  redis:
```

---

# Module 14 — Docker Compose Commands

```bash
docker compose up
docker compose up -d
docker compose up --build
docker compose down
docker compose build
docker compose ps
docker compose logs
docker compose logs -f
docker compose logs -f api
docker compose restart api
docker compose exec api sh
docker compose down -v
```

Important:

```text
docker compose down
→ removes Compose containers/network
→ named volumes normally remain

docker compose down -v
→ also removes named volumes
```

Be careful with `down -v` because persistent database data can be deleted.

---

# Module 15 — Compose Networking

Compose automatically creates an application network.

Given:

```yaml
services:

  api:

  mongodb:
```

the API can connect to:

```text
mongodb:27017
```

not:

```text
localhost:27017
```

The service name becomes a DNS name inside the Compose network.

---

# Module 16 — Compose Volumes

```yaml
services:

  mongodb:
    image: mongo
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

This means:

```text
mongo-data
    ↓
/data/db
```

The data survives normal container recreation.

However:

```bash
docker compose down -v
```

can remove the volume.

---

# Module 17 — Compose Environment Variables

Directly:

```yaml
services:
  api:
    environment:
      PORT: 5000
      NODE_ENV: development
```

Node.js accesses:

```javascript
process.env.PORT
process.env.NODE_ENV
```

## `.env`

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://mongodb:27017/mydb
```

Reference variables:

```yaml
services:
  api:
    environment:
      PORT: ${PORT}
      NODE_ENV: ${NODE_ENV}
      MONGO_URI: ${MONGO_URI}
```

## `env_file`

```yaml
services:
  api:
    env_file:
      - .env
```

## Security

Do not commit secrets to Git.

Use environment variables or a proper secret-management solution for production.

---

# Module 18 — `depends_on`

Example:

```yaml
services:

  api:
    depends_on:
      - mongodb

  mongodb:
    image: mongo
```

This establishes startup dependency/order.

Important:

> `depends_on` by itself does not guarantee that the dependency is ready to accept connections.

Container running does not necessarily mean application ready.

---

# Module 19 — Healthchecks

MongoDB:

```yaml
healthcheck:
  test:
    [
      "CMD",
      "mongosh",
      "--eval",
      "db.adminCommand('ping')"
    ]
  interval: 10s
  timeout: 5s
  retries: 5
  start_period: 10s
```

Redis:

```yaml
healthcheck:
  test: ["CMD", "redis-cli", "ping"]
  interval: 10s
  timeout: 5s
  retries: 5
  start_period: 5s
```

Combine with `depends_on`:

```yaml
api:
  depends_on:
    mongodb:
      condition: service_healthy
```

Conceptually:

```text
MongoDB starts
     ↓
Healthcheck
     ↓
Healthy?
  /     No      Yes
↓        ↓
Retry    API starts
```

Application-level retry/reconnect logic is still valuable for resilient systems.

---

# Module 20 — Restart Policies

## Always

```yaml
restart: always
```

## On failure

```yaml
restart: on-failure
```

## Unless stopped

```yaml
restart: unless-stopped
```

Restart policies help recover services after failures or Docker restarts.

---

# Module 21 — Resource Configuration

Resource limits can be configured depending on the Docker/Compose environment.

Example:

```yaml
services:
  api:
    deploy:
      resources:
        limits:
          cpus: "1.0"
          memory: 512M
```

Conceptually:

```text
API Container
    |
    +-- CPU limit
    |
    +-- Memory limit
```

Always verify how the selected Compose/deployment environment applies these settings.

---

# Module 22 — Real Node.js + MongoDB + Redis Project

Project structure:

```text
docker-node-project/
│
├── src/
│   └── server.js
│
├── Dockerfile
├── compose.yml
├── package.json
├── package-lock.json
└── .dockerignore
```

Install:

```bash
npm install express mongoose redis
```

## Dockerfile

```dockerfile
FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
```

## `.dockerignore`

```text
node_modules
npm-debug.log
.git
.gitignore
.env
Dockerfile
compose.yml
```

## Compose

```yaml
services:

  api:
    build: .
    ports:
      - "3000:5000"
    environment:
      PORT: 5000
      MONGO_URI: mongodb://mongodb:27017/mydb
      REDIS_URL: redis://redis:6379
    depends_on:
      mongodb:
        condition: service_healthy
      redis:
        condition: service_healthy

  mongodb:
    image: mongo
    volumes:
      - mongo-data:/data/db
    healthcheck:
      test:
        [
          "CMD",
          "mongosh",
          "--eval",
          "db.adminCommand('ping')"
        ]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 10s

  redis:
    image: redis
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5
      start_period: 5s

volumes:
  mongo-data:
```

Architecture:

```text
                         Docker Compose
                              |
          +-------------------+-------------------+
          |                   |                   |
          ↓                   ↓                   ↓
      Node.js API          MongoDB              Redis
       :5000                :27017              :6379
          |                   |                   |
          |                   ↓                   |
          |              mongo-data              |
          |                 volume                |
          |                                       |
          +---------- Compose Network ------------+
```

External:

```text
Browser
   ↓
localhost:3000
   ↓
Node.js Container:5000
```

Internal:

```text
Node.js
   ├── mongodb:27017
   └── redis:6379
```

Start:

```bash
docker compose up --build
```

---

# Module 23 — Development vs Production

## Development with Docker MongoDB

```text
Node.js Container
       ↓
Docker Network
       ↓
MongoDB Container
       ↓
Docker Volume
```

```env
MONGO_URI=mongodb://mongodb:27017/mydb
```

## Production with MongoDB Atlas

```text
Node.js Container
       ↓
Network/Internet
       ↓
MongoDB Atlas
```

```env
MONGO_URI=mongodb+srv://...
```

If MongoDB Atlas is used in production, a Docker volume is not required for MongoDB persistence.

Typical managed production architecture:

```text
Database → MongoDB Atlas
Files    → Object storage
Redis    → Managed Redis
Logs     → Cloud logging
```

Docker volumes are still useful when you self-host a stateful service or otherwise need Docker-managed persistent filesystem storage.

---

# Module 24 — Docker Interview Questions

### What is Docker?

A platform for packaging and running applications in isolated containers.

### What is an image?

A read-only template used to create containers.

### What is a container?

A running instance of an image.

### Image vs Container?

```text
Image     → Template
Container → Running instance
```

### What is a Dockerfile?

Instructions used to build a Docker image.

### What does `docker build` do?

Builds an image from a Dockerfile and build context.

### What does `docker run` do?

Creates and starts a container from an image.

### What does `-p 3000:5000` mean?

Maps host port 3000 to container port 5000.

### What is a Docker volume?

Persistent storage that can survive the lifecycle of a container.

### Are volumes only for development?

No. They can be used in production when Docker-managed persistent storage is appropriate. Managed services may remove the need for them.

### Why doesn't `localhost` work between containers?

Because `localhost` refers to the current container.

### How do containers communicate?

Put them on the same Docker network and use service/container names.

Example:

```text
mongodb:27017
```

### Why use service names instead of container IPs?

Container IPs can change. Docker DNS resolves service/container names.

### What is Docker Compose?

A tool for defining and running multi-container applications.

### Dockerfile vs Compose?

```text
Dockerfile
→ Defines how to build an image

Compose
→ Defines how multiple services run together
```

### What is `depends_on`?

Defines service dependency/startup ordering. It does not automatically guarantee readiness.

### What is a healthcheck?

A mechanism used to determine whether a service is healthy.

### What does `docker compose down -v` do?

Removes Compose resources and associated volumes. Persistent data in those volumes can be deleted.

### Why use `.dockerignore`?

To prevent unnecessary or sensitive files from entering the Docker build context.

### Why use multi-stage builds?

To keep build tools out of the final production image and reduce image size.

---

# Module 25 — Docker Command Cheat Sheet

## Images

```bash
docker images
docker pull <image>
docker build -t <name> .
docker rmi <image>
```

## Containers

```bash
docker run <image>
docker run -d <image>
docker ps
docker ps -a
docker start <container>
docker stop <container>
docker restart <container>
docker rm <container>
docker rm -f <container>
docker logs <container>
docker logs -f <container>
docker exec -it <container> sh
docker inspect <container>
```

## Networks

```bash
docker network ls
docker network create <network>
docker network inspect <network>
docker network connect <network> <container>
docker network disconnect <network> <container>
docker network rm <network>
```

## Volumes

```bash
docker volume ls
docker volume create <volume>
docker volume inspect <volume>
docker volume rm <volume>
```

## Compose

```bash
docker compose up
docker compose up -d
docker compose up --build
docker compose down
docker compose down -v
docker compose ps
docker compose logs
docker compose logs -f
docker compose logs -f api
docker compose build
docker compose restart api
docker compose exec api sh
```

---

# Final Mental Model

```text
Dockerfile
    ↓
docker build
    ↓
Docker Image
    ↓
docker run / docker compose
    ↓
Container
    ↓
Network + Environment + Volumes
    ↓
Running Application
```

For a multi-container Node.js application:

```text
                    Docker Compose
                         |
          +--------------+--------------+
          |              |              |
          ↓              ↓              ↓
      Node.js          MongoDB        Redis
      Container       Container      Container
          |              |              |
          |              ↓              |
          |         Docker Volume       |
          |                             |
          +------- Docker Network ------+
```

Typical production architecture:

```text
Stateless Node.js Container
           |
     +-----+------+
     |            |
     ↓            ↓
 Managed Redis   MongoDB Atlas
```

## The 10 concepts you should confidently explain

1. **Image** — packaged template.
2. **Container** — running image.
3. **Dockerfile** — image build instructions.
4. **Layers/cache** — efficient image builds.
5. **Multi-stage build** — clean/small production images.
6. **Volume** — persistent Docker-managed storage.
7. **Network** — container/service communication.
8. **Port mapping** — host-to-container access.
9. **Compose** — multi-service application definition.
10. **Healthcheck + depends_on** — startup/readiness management.

---

# Summary

The complete Docker flow is:

```text
Dockerfile
    ↓
Image
    ↓
Container
    ↓
Network + Environment + Persistent Storage
    ↓
Application
```

For multi-container applications:

```text
compose.yml
    ↓
API + Database + Redis
    ↓
Compose Network
    ↓
Service-name communication
```

For production:

```text
Stateless application
        ↓
Docker Container
        ↓
Can be replaced safely

Persistent state
        ↓
Managed database / object storage / persistent volume
```
