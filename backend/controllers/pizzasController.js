const mongoose = require('mongoose')
// const {MongoClient} = mongoose;
const pizzasSchema = mongoose.Schema({
    id: String,
    type: String,
    price: Number,
    name: String,
    image: String,
    description: String,
    ingredients: Array(String),
    topping: Array(String)

});

const IngredientsSchema = mongoose.Schema({
    id: Number,
    tname: String,
    price: Number,
    image: String
})

const PizzasModel = mongoose.model('pizzas', pizzasSchema);
const IngredientsModel = mongoose.model('ingredients', IngredientsSchema);

exports.list = async(req,res) => {
    try {
        mongoose.connect('mongodb://localhost:27017/pizzadeliverysystem')
        .then(async(data) => {
            const pizzas = await PizzasModel.find();
            res.send({
                data: pizzas
            })
        })
        .catch(err => {
            res.send({
                data: [],
                message: err
            })
        })
       
    } catch(e) {
        console.log(e);
        res.send({
            data: [],
            message: e
        })
    }
}

exports.ingredientsList = async(req,res) => {
    try {
        mongoose.connect('mongodb://localhost:27017/pizzadeliverysystem')
        .then(async(data) => {
            const ingredients = await IngredientsModel.find();
            res.send({
                data: ingredients
            });
        })
        .catch(err => {
            res.send({
                data: [],
                message: err
            })
        })
       
    } catch(e) {
        console.log(e);
        res.send({
            data: [],
            message: e
        })
    }
}