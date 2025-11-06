const express = require("express");
const { verificarToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// GET /produtos - protegido
router.get("/", verificarToken, (req, res) => {
  res.json([]); // Retorna array vazio
});

module.exports = router;
