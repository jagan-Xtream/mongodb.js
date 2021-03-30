import Express from "express";
import { recipes } from "../recipes.js";

const router = Express.Router();

router.use((req, res, next) => {
  console.log(req.url, "---", Date.now());
  req.time = Date.now();
  next();
});

router
  .route("/")
  .get(async (request, response) => {
    let filter = {};

    if (request.query.like) {
      filter.like = request.query.like;
    }
    if (request.query.ings) {
      filter.ings = new RegExp(request.query.ings, "i");
    }
    if (request.query.title) {
      filter.title = request.query.title;
    }
    // Batter or batter or BaTTer  /batter/i
    try {
      const recipes = await Recipe.find(filter);
      response.json(recipes);
    } catch (err) {
      response.send(err);
    }
  })
  .post(async (request, response) => {
    console.log(request.body);

    const recipe = new Recipe({
      title: request.body.title,
      ings: request.body.ings,
      like: request.body.like,
    });

    try {
      const newRecipe = await recipe.save();
      response.send(newRecipe);
    } catch (err) {
      response.send(err);
    }
  });

router.route("/:id").get(async (request, response) => {
  console.log("From id: ", request.time, request.params.id);
  try {
    const recipes = await Recipe.findById(request.params.id);
    response.json(recipes);
  } catch (err) {
    response.send(err);
  }
});

export default router;

// Recipe table
// Recipe id -> recipe
// 2 -> Dosa

// Ings table
// Ings id -> ings
// 3 -> Batter
// 4 -> Water

// Join table
// Recipe id -> Ings ID
// 2 -> 3
// 2 -> 4