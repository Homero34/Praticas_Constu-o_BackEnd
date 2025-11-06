// (b) Importa a classe Tarefa do arquivo modelo.js
const { Tarefa } = require("./modelo");

// (c) Função para adicionar uma nova tarefa
async function adicionarTarefa(nome) {
  // (d) Cria uma instância da classe Tarefa
  const tarefa = new Tarefa(nome, false);
  // (e) Inicializa e insere no banco de dados
  await tarefa.init();
  await tarefa.inserir();
}

// (f) Função para buscar uma tarefa pelo nome
async function buscarTarefa(nome) {
  // (g) Cria uma instância da classe Tarefa
  const tarefa = new Tarefa(nome, false);
  // (h) Inicializa e busca no banco de dados
  await tarefa.init();
  await tarefa.buscar();
  // (i) Retorna a instância da tarefa (com dados atualizados, se encontrados)
  return tarefa;
}

// (j) Função para atualizar uma tarefa existente
async function atualizarTarefa(nome, concluida) {
  // (k) Cria uma instância da classe Tarefa
  const tarefa = new Tarefa(nome, concluida);
  // (l) Inicializa e busca no banco
  await tarefa.init();
  await tarefa.buscar();

  // Se encontrou, atualiza e salva
  if (tarefa.id) {
    tarefa.nome = nome;
    tarefa.concluida = concluida;
    // (m) Chama o método alterar()
    await tarefa.alterar();
  } else {
    console.log(`⚠️ Tarefa '${nome}' não encontrada para atualização.`);
  }
}

// (n) Função para remover uma tarefa
async function removerTarefa(nome) {
  // (o) Cria uma instância da classe Tarefa
  const tarefa = new Tarefa(nome, false);
  // (p) Inicializa e busca
  await tarefa.init();
  await tarefa.buscar();

  // Se encontrou, deleta
  if (tarefa.id) {
    await tarefa.deletar();
  } else {
    console.log(`⚠️ Tarefa '${nome}' não encontrada para exclusão.`);
  }
}

// (q) Exporta todas as funções
module.exports = {
  adicionarTarefa,
  buscarTarefa,
  atualizarTarefa,
  removerTarefa,
};
