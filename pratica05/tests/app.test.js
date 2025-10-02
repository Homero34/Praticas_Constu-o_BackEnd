const request = require('supertest');
const app = require('../app');

let tarefaId;

describe('API de Tarefas', () => {
  test('GET /tarefas deve retornar 200 e JSON', async () => {
    const res = await request(app).get('/tarefas');
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('POST /tarefas deve criar tarefa e retornar 201 com JSON', async () => {
    const res = await request(app)
      .post('/tarefas')
      .send({ nome: 'Estudar Node', concluida: false });
    expect(res.statusCode).toBe(201);
    expect(res.headers['content-type']).toMatch(/json/);
    expect(res.body.id).toBeDefined();
    tarefaId = res.body.id;  // Guarda para testes seguintes
  });

  test('GET /tarefas/:id deve retornar 200 e JSON para tarefa criada', async () => {
    const res = await request(app).get(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('GET /tarefas/1 deve retornar 404 e JSON', async () => {
    const res = await request(app).get('/tarefas/1');
    expect(res.statusCode).toBe(404);
    expect(res.body.msg).toBe('Tarefa não encontrada');
  });

  test('PUT /tarefas/:id deve atualizar tarefa e retornar 200', async () => {
    const res = await request(app)
      .put(`/tarefas/${tarefaId}`)
      .send({ nome: 'Estudar Node e Express', concluida: true });
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(tarefaId);
  });

  test('PUT /tarefas/1 deve retornar 404', async () => {
    const res = await request(app).put('/tarefas/1').send({});
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /tarefas/:id deve retornar 204', async () => {
    const res = await request(app).delete(`/tarefas/${tarefaId}`);
    expect(res.statusCode).toBe(204);
  });

  test('DELETE /tarefas/1 deve retornar 404', async () => {
    const res = await request(app).delete('/tarefas/1');
    expect(res.statusCode).toBe(404);
  });
});
