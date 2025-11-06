// (b) Importa o pacote readline-sync
const readline = require("readline-sync");

// (c) Importa o controlador
const controlador = require("./controller/controlador");

// (d) Função que exibe o menu
function menu() {
  console.log("\n===== MENU DE TAREFAS =====");
  console.log("1 - Adicionar tarefa");
  console.log("2 - Buscar tarefa");
  console.log("3 - Atualizar tarefa");
  console.log("4 - Remover tarefa");
  console.log("5 - Sair");
}

// (e) Função que trata a opção escolhida
async function escolherOpcao(opcao) {
  switch (opcao) {
    case "1":
      // (g) Adicionar tarefa
      const nomeAdd = readline.question("Digite o nome da tarefa: ");
      await controlador.adicionarTarefa(nomeAdd);
      break;

    case "2":
      // (h) Buscar tarefa
      const nomeBusca = readline.question("Digite o nome da tarefa a buscar: ");
      const tarefa = await controlador.buscarTarefa(nomeBusca);
      if (tarefa.id) {
        console.log("\n Tarefa encontrada:");
        console.log(`ID: ${tarefa.id}`);
        console.log(`Nome: ${tarefa.nome}`);
        console.log(`Concluída: ${tarefa.concluida ? "Sim" : "Não"}`);
      } else {
        console.log(`Tarefa '${nomeBusca}' não encontrada.`);
      }
      break;

    case "3":
      // (i) Atualizar tarefa
      const nomeAtualiza = readline.question("Digite o nome da tarefa a atualizar: ");
      const concluidaStr = readline.question("A tarefa está concluída? (s/n): ");
      const concluida = concluidaStr.toLowerCase() === "s";
      await controlador.atualizarTarefa(nomeAtualiza, concluida);
      break;

    case "4":
      // (j) Remover tarefa
      const nomeRemove = readline.question("Digite o nome da tarefa a remover: ");
      await controlador.removerTarefa(nomeRemove);
      break;

    case "5":
      // (k) Sair
      console.log(" Encerrando o programa...");
      process.exit(0);

    default:
      console.log(" Opção inválida! Tente novamente.");
  }
}

// (l) Função principal com laço infinito
async function main() {
  while (true) {
    menu();
    const opcao = readline.question("Escolha uma opcao: ");
    await escolherOpcao(opcao); // (m)
  }
}

// (n) Chama a função principal
main();
