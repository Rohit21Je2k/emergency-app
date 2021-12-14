import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user-routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// cors
app.use(cors());

// bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// home route
app.get("/", (req, res) => {
  res.send("Server Running");
});

// user routes
app.use("/api/users", userRouter);

// path not found
app.use((req, res, next) => {
  res.status(400).send({
    message: "path does not exist",
  });
});

// database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.s4fs8.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 8000);
    console.log("Connection to Server and Database established");
  })
  .catch((err) => console.log(err));
