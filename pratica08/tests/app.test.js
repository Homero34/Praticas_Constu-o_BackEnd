const supertest = require("supertest");
const app = require("../app");
const request = supertest(app);

let token;

describe("API REST - Testes JWT", () => {

  it("GET /produtos sem token retorna 401", async () => {
    const res = await request.get("/produtos");
    expect(res.status).toBe(401);
    expect(res.body.msg).toBe("Não autorizado");
  });

  it("POST /usuarios/login gera token", async () => {
    const res = await request.post("/usuarios/login").send({ email: "teste@exemplo.com" });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("GET /produtos com token válido retorna 200", async () => {
    const res = await request.get("/produtos").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("POST /usuarios/renovar gera novo token", async () => {
    const res = await request.post("/usuarios/renovar").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token;
  });

  it("GET /produtos com novo token retorna 200", async () => {
    const res = await request.get("/produtos").set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

});
