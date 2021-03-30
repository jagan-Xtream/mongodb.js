import cors from "cors";
import Express from "express";
import mongoose from "mongoose";
import { Recipe } from './models/recipes.js';
import router from "./routes/recipes.js";

const url = "mongodb://localhost/RecipeData";

mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", function () {
  console.log("Mongo DB connected");
});

const app = Express();

const port = 3200;

app.use(cors());
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/recipes", router);
// app.use("/price", router);
// app.use("/comments", router);

app.get("/", async (request, response) => {
  try {
    const recipes = await Recipe.find();
    response.json(recipes);
  } catch (err) {
    console.log(err)
    response.send("Hello World");
  }
});

app.listen(port, () => console.log("Started"));
