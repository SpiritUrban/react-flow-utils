const express = require("express");
const path = require("path");

const app = express();

// Middleware для парсинга JSON
app.use(express.json());

// Статическая раздача React
app.use(express.static(path.join(__dirname, "dist")));

// API роуты
app.get("/api/nodes", (req, res) => {
  res.json([{ id: "1", label: "Node 1" }, { id: "2", label: "Node 2" }]);
});

// Запуск сервера
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
