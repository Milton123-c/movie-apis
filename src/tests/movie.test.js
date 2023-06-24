const supertest = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");

require("../models");

let movieId;

const body = {
  name: "El gato con botas",
  image: "imagen",
  synopsis: "Una pelicula de un gato con botas",
  releaseYear: "2008",
};

test("POST -> /API/V1/movies Movie, whould return status code 201", async () => {
  const res = await supertest(app).post("/api/v1/movies").send(body);

  movieId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body.name).toBe(body.name);
});

test("GET -> /API/V1/movies Movie, whould return status code 200", async () => {
  const res = await supertest(app).get("/api/v1/movies");
s
  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);
  expect(res.body[0].genres).toBeDefined();
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].actors).toBeDefined();
});

test("GET ONE -> /API/V1/movies/:id Movie, whould return status code 200", async () => {
  const res = await supertest(app).get(`/api/v1/movies/${movieId}`);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe("El gato con botas");
});

test("PUT -> /API/V1/movies/:id Movie, whould return status code 200", async () => {
  body.name = "Dance";

  const res = await supertest(app).put(`/api/v1/movies/${movieId}`).send(body);

  expect(res.status).toBe(200);
  expect(res.body.name).toBe("Dance");
});

//POST /movies/:id/actors

test("POST -> /API/V1/movies/:id/actors, set actors movies, should status code 200 and res.body.length = 1", async () => {
  const actorBody = {
    firstName: "Milton David",
    lastName: "Gago Mercado",
    image: "Imagen",
    nationality: "Costa rica",
    birthday: "1997-12-04",
  };

  const actors = await Actor.create(actorBody);

  const res = await supertest(app)
    .post(`/API/V1/movies/${movieId}/actors`)
    .send([actors.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await actors.destroy();
});

//POST /movies/:id/directors

test("POST -> /API/V1/movies/:id/directors, set directors movies, should status code 200 and res.body.length = 1", async () => {
  const directorBody = {
    firstName: "Julio Lopez",
    lastName: "Ortega",
    image: "Imagen",
    nationality: "Costa rica",
    birthday: "1957-11-15",
  };

  const director = await Director.create(directorBody);

  const res = await supertest(app)
    .post(`/API/V1/movies/${movieId}/directors`)
    .send([director.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await director.destroy();
});

//POST /movies/:id/genres

test("POST -> /API/V1/movies/:id/genres, set genres movies, should status code 200 and res.body.length = 1", async () => {
  const genreBody = {
    name: "Action",
  };

  const genres = await Genre.create(genreBody);

  const res = await supertest(app)
    .post(`/API/V1/movies/${movieId}/genres`)
    .send([genres.id]);

  expect(res.status).toBe(200);
  expect(res.body).toHaveLength(1);

  await genres.destroy();
});

test("DELETE -> /API/V1/movies/:id Movie, whould return status code 204", async () => {
  const res = await supertest(app).delete(`/api/v1/movies/${movieId}`);

  expect(res.status).toBe(204);
});
