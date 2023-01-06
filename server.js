const express = require('express');
const app = express();
const serverConfig = require('./configs/server.config');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const User = require("./models/user.model");
const bcrypt = require("bcryptjs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to MongoDB");
});
db.once("open", () => {
    console.log("Connected to mongoDB");
    
});

async function init() {

    try {

        await User.collection.drop();
        
        const user = await User.create({
            name: "Vishwa",
            userId: "admin",
            password: bcrypt.hashSync("Welcome1", 8),
            email: "kankvish@gmail.com",
            userType: "ADMIN"
        });

        console.log(user);
    } catch (err) {
        console.log("err in db initialization , " + err.message);
    }

}

require("./routes/auth.route")(app); 
require("./routes/user.route")(app);
require("./routes/ticket.route")(app);

module.exports = app.listen(serverConfig.PORT, () => {
    console.log("Started the server on the PORT number : ", serverConfig.PORT);
});