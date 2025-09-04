const { calcularMediaAluno } = require('../src/calcularMediaAluno');


it("calcular media ",() => {
    expect(calcularMediaAluno).toBeDefined()
})

it('deve lançar erro se a1 e a2 estiverem indefinidos', () => {
    expect(() => calcularMediaAluno(undefined, undefined)).toThrow('Notas a1 ou a2 não informadas');
  });

it('deve lançar erro se a1 e a2 forem negativos', () => {
    expect(() => calcularMediaAluno(-2, -4)).toThrow('Notas a1 ou a2 não podem ser negativas');
  });

it('deve calcular a média corretamente quando a3 não é informada', () => {
      const resultado = calcularMediaAluno(7.5, 8.2);
      expect(resultado).toBeCloseTo(7.9199999999, 2); // 2 casas decimais de precisão
    });

it('deve calcular a média ponderada com a1 * 0.4 + a2 * 0.6 quando a3 não é informada', () => {
        const resultado = calcularMediaAluno(7, 9); // 7 * 0.4 + 9 * 0.6 = 2.8 + 5.4 = 8.2
        expect(resultado).toBeCloseTo(8.2, 2);
      });
it('deve lançar erro se a3 for negativa', () => {
        expect(() => {
          calcularMediaAluno(7, 8, -2);
        }).toThrow('Nota a3 não pode ser negativa');
      });
it('deve calcular a média com a1 e a3 se forem a melhor combinação', () => {
        const resultado = calcularMediaAluno(9, 5, 8); // usa 9 e 8
        // a1 = 9 (0.4), a3 = 8 (0.6) => 9*0.4 + 8*0.6 = 3.6 + 4.8 = 8.4
        expect(resultado).toBeCloseTo(8.6, 2);
      });
it('deve calcular a média com a3 e a2 se forem a melhor combinação', () => {
        const resultado = calcularMediaAluno(4, 8, 9); // usa 9 e 8
        expect(resultado).toBeCloseTo(8.6, 2);
      });