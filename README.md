# 🍽️ Cheko – Restaurant Menu System

## 💡Overview
 Cheko is a lightweight yet scalable restaurant backend system that allows users to browse menus with ease.
 
## 📘 Swagger

- **Interactive docs UI:** [http://localhost:8080/cheko/swagger](http://localhost:8080/cheko/swagger)  

##  📂 Architecture Choice:
 Given the project’s small scope, Cheko uses a simple layered structure:
 Controller → Service → Repository
 This keeps the code clear, maintainable, and easy to extend.

##  🛠 Tech Stack
- Language: Java
- Framework:** Spring Boot
- Database: PostgreSQL
- Cache: Redis
- Build Tool: Maven 
- Migrations: Liquibase
- Containers: Docker & docker-compose

## ⚙️ Configuration
Environment Variables:
We never commit real secrets. This repo includes a .env.example file with dummy placeholders.
- Setup:
```bash
cp .env.example .env
```
Then edit .env to match your local environment.

## 📦 Postman Collection

You can import the ready-made Postman collection into your Postman app.

**Download here:** [Cheko.postman_collection.json](postman/Cheko.postman_collection.json)

### How to Import
1. Download the JSON file above  
2. Open Postman → **Import**  
3. Select the downloaded file  
  

## 🚀 Quick Start with Docker

### Run Everything
Your `docker-compose.yml` contains **API + PostgreSQL + Redis**.

```bash
docker compose up --build


