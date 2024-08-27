const express = require('express');
const router = express.Router();
const pizzasController = require("./controllers/pizzasController")


router.route("/pizzas/list").get(pizzasController.list);

module.exports = router;