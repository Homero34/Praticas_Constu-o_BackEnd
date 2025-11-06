require("dotenv").config(); // Carrega variáveis do .env
const express = require("express");
const app = express();

// Middlewares
app.use(express.json());

// Importa os routers
const usuariosRouter = require("./routes/usuariosRouter");
const produtosRouter = require("./routes/produtosRouter");

// Usa os routers
app.use("/usuarios", usuariosRouter);
app.use("/produtos", produtosRouter);

module.exports = app;
