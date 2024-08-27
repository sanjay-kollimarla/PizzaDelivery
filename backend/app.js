const express = require('express');
const app = express();
const cors= require('cors');
const BP = require("body-parser");
const routes = require("./routes");
app.use(cors());
app.use(BP.json());

app.use(routes);

app.listen(3005,(err,d) => {
    console.log("listening to 3005")
})