const request = require('supertest');
const app = require('../app'); // importa a instância do Express

describe('Testes da API /produtos', () => {
  let produtoId;

  // 🧪 f) Teste POST /produtos - criação bem-sucedida
  test('POST /produtos deve criar um novo produto e retornar 201', async () => {
    const novoProduto = { nome: 'Laranja', preco: 10.0 };

    const response = await request(app)
      .post('/produtos')
      .send(novoProduto)
      .expect('Content-Type', /json/)
      .expect(201);

    expect(response.body).toHaveProperty('_id');
    expect(response.body.nome).toBe('Laranja');
    expect(response.body.preco).toBe(10.0);

    produtoId = response.body._id; // 🧪 g) salvar o ID para os próximos testes
  });

  // 🧪 h) Teste POST sem JSON
  test('POST /produtos sem corpo deve retornar 422 e mensagem de erro', async () => {
    const response = await request(app)
      .post('/produtos')
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  // 🧪 i) Teste GET /produtos
  test('GET /produtos deve retornar 200 e um array de produtos', async () => {
    const response = await request(app)
      .get('/produtos')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
  });

  // 🧪 j) Teste GET /produtos/:id existente
  test('GET /produtos/:id deve retornar o produto com status 200', async () => {
    const response = await request(app)
      .get(`/produtos/${produtoId}`)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body).toHaveProperty('nome', 'Laranja');
    expect(response.body).toHaveProperty('preco', 10.0);
  });

  // 🧪 k) Teste GET /produtos/0 (id inválido)
  test('GET /produtos/0 deve retornar 400 e mensagem "Parâmetro inválido"', async () => {
    const response = await request(app)
      .get('/produtos/0')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  // 🧪 l) Teste GET /produtos inexistente
  test('GET /produtos/000000000000000000000000 deve retornar 404 e mensagem "Produto não encontrado"', async () => {
    const response = await request(app)
      .get('/produtos/000000000000000000000000')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body.msg).toBe('Produto não encontrado');
  });

  // 🧪 m) Teste PUT /produtos/:id existente
  test('PUT /produtos/:id deve atualizar produto e retornar 200', async () => {
    const produtoAtualizado = { nome: 'Laranja Pera', preco: 18.0 };

    const response = await request(app)
      .put(`/produtos/${produtoId}`)
      .send(produtoAtualizado)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('_id', produtoId);
    expect(response.body.nome).toBe('Laranja Pera');
    expect(response.body.preco).toBe(18.0);
  });

  // 🧪 n) Teste PUT sem JSON
  test('PUT /produtos/:id sem corpo deve retornar 422 e mensagem de erro', async () => {
    const response = await request(app)
      .put(`/produtos/${produtoId}`)
      .send({})
      .expect('Content-Type', /json/)
      .expect(422);

    expect(response.body.msg).toBe('Nome e preço do produto são obrigatórios');
  });

  // 🧪 o) Teste PUT /produtos/0
  test('PUT /produtos/0 deve retornar 400 e mensagem "Parâmetro inválido"', async () => {
    const response = await request(app)
      .put('/produtos/0')
      .send({ nome: 'Teste', preco: 5.0 })
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  // 🧪 p) Teste PUT /produtos/000000000000000000000000
  test('PUT /produtos inexistente deve retornar 404', async () => {
    const response = await request(app)
      .put('/produtos/000000000000000000000000')
      .send({ nome: 'Teste', preco: 5.0 })
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body.msg).toBe('Produto não encontrado');
  });

  // 🧪 q) Teste DELETE /produtos/:id existente
  test('DELETE /produtos/:id deve remover o produto e retornar 204', async () => {
    await request(app)
      .delete(`/produtos/${produtoId}`)
      .expect(204);
  });

  // 🧪 r) Teste DELETE /produtos/0
  test('DELETE /produtos/0 deve retornar 400 e mensagem "Parâmetro inválido"', async () => {
    const response = await request(app)
      .delete('/produtos/0')
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body.msg).toBe('Parâmetro inválido');
  });

  // 🧪 s) Teste DELETE inexistente
  test('DELETE /produtos/000000000000000000000000 deve retornar 404', async () => {
    const response = await request(app)
      .delete('/produtos/000000000000000000000000')
      .expect('Content-Type', /json/)
      .expect(404);

    expect(response.body.msg).toBe('Produto não encontrado');
  });
});
