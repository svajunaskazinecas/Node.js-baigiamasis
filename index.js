import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import ticketsRouter from "./src/route/ticket.js";

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => console.log("Connected!"))
  .catch((err) => {
    console.log(err);
  });

app.use(ticketsRouter);

app.listen(process.env.PORT, () => {
  console.log(`Your app is started on port ${process.env.PORT}`);
});
