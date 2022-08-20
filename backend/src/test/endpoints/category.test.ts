import request from "supertest";
import { app, stopDb } from "../../index";
import { Category } from "../../schemas/Category";
import mongoose from "mongoose";

// Categoría genérica de prueba
const categoryData = {
  name: "Bazar",
};

const incorrectCategoryData = {};

beforeAll(async () => {
  await Category.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  await stopDb(); 
});

describe("Category endpoints", () => {
  it("Testing correct category post", async () => {
    const res = await request(app).post("/api/category").send(categoryData);
    expect(res.statusCode).toEqual(201);
  });

  it("Testing create category already created", async() => {
    const res = await request(app).post("/api/category").send(categoryData);
    expect(res.statusCode).toEqual(400);
  });

  it("Testing incorrect name in category post", async () => {
    const res = await request(app).post("/api/category").send(incorrectCategoryData);
    expect(res.statusCode).toEqual(400);
  });
});
