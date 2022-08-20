import request from "supertest";
import { app, stopDb } from "../../index";
import { User } from "../../schemas/User";
import mongoose from "mongoose";

// Usuario generico de prueba
const userData = {
  username: "Juan",
  email: "juan@gmail.com",
  role: "admin",
  password: "12345678"
};

const incorrectRoleUserData = {
  username: "Juan",
  email: "juan@gmail.com",
  role: "a",
  password: "12345678"
}

const incorrectEmailUserData = {
  username: "Juan",
  email: "juan@gmail.com",
  role: "a",
  password: "12345678"
}

beforeAll(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  await stopDb(); 
});

describe("User endpoints", () => {
  it("Testing correct user post", async () => {
    const res = await request(app).post("/api/user").send(userData);
    expect(res.statusCode).toEqual(201);
  });

  it("Testing create user already created", async() => {
    const res = await request(app).post("/api/user").send(userData);
    expect(res.statusCode).toEqual(400);
  });

  it("Testing incorrect role in user post", async () => {
    const res = await request(app).post("/api/user").send(incorrectRoleUserData);
    expect(res.statusCode).toEqual(400);
  });

  it("Testing incorrect email in user post", async () => {
    const res = await request(app).post("/api/user").send(incorrectEmailUserData);
    expect(res.statusCode).toEqual(400);
  });
});
