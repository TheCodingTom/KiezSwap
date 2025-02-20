import express from "express"
// var colors = require('colors');
import colors from "colors"

import cors from "cors"

const app = express();

const port = process.env.PORT || 4000; // until deployment the value will be 5000

app.listen(port, () => {
    console.log(`Server is running on ${port} port`.bgGreen);
});

