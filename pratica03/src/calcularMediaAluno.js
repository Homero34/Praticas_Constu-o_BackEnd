 function calcularMediaAluno(a1, a2, a3){

    if (a1 === undefined || a2 === undefined) {
        throw new Error('Notas a1 ou a2 não informadas');
      }

    if (a1 < 0 || a2 < 0){
        throw new Error("Notas a1 ou a2 não podem ser negativas");
    }
    if (a3 !== undefined && a3 < 0) {
        throw new Error('Nota a3 não pode ser negativa');
      }
      if (a3 < 0) {
        throw new Error('Nota a3 não pode ser negativa');
      }

      const combinacoes = [
        [a1, a2],
        [a1, a3],
        [a2, a3]
      ];
  
      const medias = combinacoes.map(([n1, n2]) => {
        const maior = Math.max(n1, n2);
        const menor = Math.min(n1, n2);
        return maior * 0.6 + menor * 0.4;
      });
    
      if (a3 === undefined) {
        return a1 * 0.4 + a2 * 0.6; 
      }
    
      return Math.max(...medias);

}


  
  
module.exports = { calcularMediaAluno };

