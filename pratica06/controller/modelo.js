// Importa a função conectarDb do arquivo database.js
const { conectarDb } = require("../database");

class Tarefa {
  db = null;
  collection = null;

  constructor(nome, concluida) {
    this.nome = nome;
    this.concluida = concluida;
    this.id = null;
  }

  // Inicializa a conexão com o banco e define a coleção 'tarefas'
  async init() {
    this.db = await conectarDb();
    this.collection = this.db.collection("tarefas");
  }

  // Insere uma nova tarefa no banco
  async inserir() {
    const resultado = await this.collection.insertOne({
      nome: this.nome,
      concluida: this.concluida,
    });
    this.id = resultado.insertedId;
    console.log(`Tarefa inserida com ID: ${this.id}`);
  }

  // Altera uma tarefa existente
  async alterar() {
    await this.collection.updateOne(
      { _id: this.id },
      { $set: { nome: this.nome, concluida: this.concluida } }
    );
    console.log(` Tarefa ${this.id} alterada com sucesso.`);
  }

  // Deleta uma tarefa pelo nome
  async deletar() {
    await this.collection.deleteOne({ nome: this.nome });
    console.log(` Tarefa '${this.nome}' deletada.`);
  }

  // Busca uma tarefa pelo nome e atualiza os dados da instância
  async buscar() {
    const resultado = await this.collection.findOne({ nome: this.nome });
    if (resultado) {
      this.id = resultado._id;
      this.nome = resultado.nome;
      this.concluida = resultado.concluida;
      console.log(`Tarefa encontrada:`, resultado);
    } else {
      console.log(`Nenhuma tarefa encontrada com o nome '${this.nome}'.`);
    }
  }
}

// Exporta a classe Tarefa
module.exports = { Tarefa };
