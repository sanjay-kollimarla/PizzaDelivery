const express = require('express');
const router = express.Router();
const pizzasController = require("./controllers/pizzasController")


router.route("/pizzas/list").get(pizzasController.list);
router.route("/pizzas/ingredients/list").get(pizzasController.ingredientsList);

module.exports = router;