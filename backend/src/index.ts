import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import routes from './routes/index';

const cors = require('cors');

const { MongoMemoryServer } = require("mongodb-memory-server"); // To create a mock DB with mongo for testing
let mongo: any = undefined; // Needs to be stopped when creating MongoMemoryServer for testing

export const stopDb = async () => {
  if (mongo) await mongo.stop();
}

dotenv.config(); // .env Configuration

export const app: Express = express();
app.use(cors())
const port = process.env.PORT;

const run = async () => {
  let DB_URL = process.env.MONGO_URL;

  if (process.env.NODE_ENV === "test") 
  {
    mongo = await MongoMemoryServer.create()
    DB_URL = await mongo.getUri();
  }

  await mongoose.connect(`${DB_URL}`);
};

app.get('/', (req, res) => {
  res.send("Express app con db! :D");
});

app.use(express.json());
app.use("/api", routes);

run()
  .then(result => {
    if (process.env.NODE_ENV !== "test") app.listen(port, () => {console.log(`⚡️[server]: Server is running at https://localhost:${port}`);})
  })
  .catch(err => console.log(err));

