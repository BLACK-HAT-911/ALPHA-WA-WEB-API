# Alpha Blake API

A cool and lightweight WhatsApp pairing API with auto-generated User IDs using Node.js, Express, and `whatsapp-web.js`.

## 🔧 Features

- 📱 WhatsApp Web pairing via QR code
- 🔐 Auto-generated unique user IDs
- 📦 Modular architecture (controllers, routes, services, utils)
- 🧩 QR code generation and status checking
- 🌐 REST API ready

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start the Server

```bash
npm start
```

Server will run on: `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint              | Description                  |
|--------|-----------------------|------------------------------|
| POST   | /api/pairing/start    | Start WhatsApp pairing       |
| POST   | /api/pairing/verify   | Verify pairing using QR      |
| GET    | /api/pairing/status   | Check WhatsApp session status|

## 🐳 Docker Support

This project supports Docker out of the box.

Build and run:

```bash
docker build -t alpha-blake-api .
docker run -p 3000:3000 alpha-blake-api
```

---

### ✅ Tech Stack

- Express.js
- whatsapp-web.js
- QR Code Generator
- UUID for unique user IDs

---

MIT License © 2025
