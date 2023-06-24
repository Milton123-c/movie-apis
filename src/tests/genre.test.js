const supertest = require("supertest");
const app = require("../app");

require("../models");

let genreId;

const body = {
  name: "Action",
};

test("POST -> /API/V1/genres Genre, whould return status code 201", async () => {
  const res = await supertest(app).post("/api/v1/genres").send(body);

  genreId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.firstName).toBe(body.firstName);
});

test("GET -> /API/V1/genres Genre, whould return status code 200", async () => {
  const res = await supertest(app).get("/api/v1/genres");

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
});

test("GET ONE -> /API/V1/genres/:id Genre, whould return status code 200", async () => {
  const res = await supertest(app).get(`/api/v1/genres/${genreId}`);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe("Action");
});

test("PUT -> /API/V1/genres/:id Genre, whould return status code 200", async () => {
  body.name = "Comedy";

  const res = await supertest(app).put(`/api/v1/genres/${genreId}`).send(body);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe("Comedy");
});

test("DELETE -> /API/V1/genres/:id Genre, whould return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/genres/${genreId}`);

  expect(res.status).toBe(204);
});
