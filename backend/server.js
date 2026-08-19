// require("./src/config/database.js");
// require('dotenv').config();
// const app = require('./src/app');

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// });

import dotenv from "dotenv/config";
import app from "./src/app.js";



const PORT = process.env.PORT || "3000";

app.listen(PORT, () => {
    console.log(`Server Berjalan di port ${PORT}`)
})
