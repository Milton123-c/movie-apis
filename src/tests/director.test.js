const supertest = require("supertest");
const app = require("../app");

require("../models");

let directorId;

const body = {
  firstName: "Julio Lopez",
  lastName: "Ortega",
  image: "Imagen",
  nationality: "Costa rica",
  birthday: "1957-11-15",
};

test("POST -> /API/V1/directors Director, whould return status code 201", async () => {
  const res = await supertest(app).post("/api/v1/directors").send(body);

  directorId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(body.firstName);
});

test("GET ->  /API/V1/directors Director, whould return status code 200", async () => {
  const res = await supertest(app).get("/api/v1/directors");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> /API/V1/directors/:id Directors, whould return status code 200", async () => {
  const res = await supertest(app).get(`/api/v1/directors/${directorId}`);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(body.firstName);
});

test("PUT -> /API/V1/directors/:id Director, whould return status code 200", async () => {
  body.firstName = "Raul Mendez";

  const res = await supertest(app)
    .put(`/api/v1/directors/${directorId}`)
    .send(body);

  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe("Raul Mendez");
});

test("DELETE -> /API/V1/directors/:id Directors, whould return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/directors/${directorId}`);

  expect(res.status).toBe(204);
});
