import request from "supertest";
import app from "../src/app.js";

describe("Testes de Integração - API de Quadras", () => {
  it("Deve retornar status 200 na rota raiz", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });
});
