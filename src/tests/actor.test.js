const supertest = require("supertest");
const app = require("../app");

require("../models");

let actorId;

const body = {
  firstName: "Milton David",
  lastName: "Gago Mercado",
  image: "Imagen",
  nationality: "Costa rica",
  birthday: "1997-12-04",
};

test("POST -> /API/V1/actors Actors, whould return status code 201", async () => {
  const res = await supertest(app).post("/api/v1/actors").send(body);

  actorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(body.firstName);
});

test("GET -> /API/V1/actors Actors, whould return status code 200", async () => {
  const res = await supertest(app).get("/api/v1/actors");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> /API/V1/actors/:id Actors, whould return status code 200", async () => {
  const res = await supertest(app).get(`/api/v1/actors/${actorId}`);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
});

test("PUT -> /API/V1/actors/:id Actors, whould return status code 200", async () => {
  body.firstName = "David";

  const res = await supertest(app).put(`/api/v1/actors/${actorId}`).send(body);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe("David");
});

test("DELETE -> /API/V1/actors/:id Actors, whould return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/actors/${actorId}`);

  expect(res.status).toBe(204);
});
