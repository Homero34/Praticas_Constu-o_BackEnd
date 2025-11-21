const {
    cifrarSenha,
    gerarToken,
    compararSenha
  } = require("../middlewares/authMiddleware");
  
  const Usuario = require("../models/usuariosModel");
  
  // POST /usuarios
  async function criar(req, res) {
    try {
      const senhaCifrada = cifrarSenha(req.body.senha);
  
      const novoUsuario = await Usuario.create({
        email: req.body.email,
        senha: senhaCifrada
      });
  
      return res.status(201).json({
        _id: novoUsuario._id,
        email: novoUsuario.email
      });
  
    } catch (error) {
      return res.status(422).json({ msg: "Email e Senha são obrigatórios" });
    }
  }
  
  // POST /usuarios/login
  async function entrar(req, res) {
    try {
      const usuarioEncontrado = await Usuario.findOne({
        email: req.body.usuario
      });
  
      if (
        !usuarioEncontrado ||
        !compararSenha(req.body.senha, usuarioEncontrado.senha)
      ) {
        return res.status(401).json({ msg: "Credenciais inválidas" });
      }
  
      const token = gerarToken({ email: req.body.usuario });
  
      return res.status(200).json({ token });
  
    } catch (error) {
      return res.status(401).json({ msg: "Credenciais inválidas" });
    }
  }
  
  // POST /usuarios/renovar
  async function renovar(req, res) {
    const token = gerarToken({ email: req.usuario });
    return res.status(200).json({ token });
  }
  
  // DELETE /usuarios/:id
  async function remover(req, res) {
    await Usuario.findOneAndDelete({ _id: req.params.id });
    return res.status(204).send();
  }
  
  module.exports = {
    criar,
    entrar,
    renovar,
    remover
  };
  