const jwt = require("jsonwebtoken");

function verificarToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Não autorizado" });

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token inválido" });
  }
}

function gerarToken(payload) {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 120 });
  } catch {
    throw new Error("Erro ao gerar o token");
  }
}

module.exports = { verificarToken, gerarToken };
