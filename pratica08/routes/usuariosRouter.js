const express = require("express");
const { gerarToken, verificarToken } = require("../middlewares/authMiddleware");
const router = express.Router();

// Login
router.post("/login", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ msg: "Email é obrigatório" });

  const token = gerarToken({ email });
  res.status(200).json({ token });
});

// Renovar token
router.post("/renovar", verificarToken, (req, res) => {
  const token = gerarToken({ email: req.usuario.email });
  res.status(200).json({ token });
});

module.exports = router;
