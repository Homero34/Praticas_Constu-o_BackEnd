const supertest = require("supertest");
const app = require("../app");

const request = supertest(app);

let usuarioId = "";
let tokenSalvo = "";

describe("Testes do recurso /usuarios", () => {
  
  test("POST /usuarios - deve criar usuário", async () => {
    const res = await request.post("/usuarios").send({
      email: "usuario@email.com",
      senha: "abcd1234"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.email).toBe("usuario@email.com");

    usuarioId = res.body._id;
  });

  test("POST /usuarios - sem JSON retorna 422", async () => {
    const res = await request.post("/usuarios").send({});

    expect(res.statusCode).toBe(422);
    expect(res.body.msg).toBe("Email e Senha são obrigatórios");
  });

  test("POST /usuarios/login - login correto", async () => {
    const res = await request.post("/usuarios/login").send({
      usuario: "usuario@email.com",
      senha: "abcd1234"
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");

    tokenSalvo = res.body.token;
  });

  test("POST /usuarios/login - sem JSON", async () => {
    const res = await request.post("/usuarios/login").send({});

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe("Credenciais inválidas");
  });

  test("POST /usuarios/renovar - token válido", async () => {
    const res = await request
      .post("/usuarios/renovar")
      .set("authorization", `Bearer ${tokenSalvo}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("POST /usuarios/renovar - token inválido", async () => {
    const res = await request
      .post("/usuarios/renovar")
      .set("authorization", "Bearer 123456789");

    expect(res.statusCode).toBe(401);
    expect(res.body.msg).toBe("Token invalido");
  });

  test("DELETE /usuarios/:id - deve apagar usuário", async () => {
    const res = await request
      .delete(`/usuarios/${usuarioId}`)
      .set("authorization", `Bearer ${tokenSalvo}`);

    expect(res.statusCode).toBe(204);
  });

});
