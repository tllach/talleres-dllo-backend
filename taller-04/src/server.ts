import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import userRoutes from "./user/v1/user.routes";

const app = express();


app.use(cors());
app.use(express.json());

const SERVER_VERSION = "/api/v1/";


app.use(SERVER_VERSION + "users", userRoutes);

function routeNotFound(request: express.Request, response: express.Response) {
  response.status(404).json({
    message: "Route not found",
  });
}

app.use(routeNotFound);


mongoose
  .connect("mongodb://localhost:27017/tabata-database")
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(8080, () => {
      console.log("Server listening on port 8080");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
