require('dotenv').config();
console.log('Environment PORT:', process.env.PORT);
const express = require("express");
const PORT = process.env.PORT  || 8001;
const path = require('path');
const cookieParser = require("cookie-parser")

const { connectMongoDb } = require("./connect");

const urlRoute = require("./routers/url");
const staticRoute = require('./routers/staticRouter')
const userRoute = require("./routers/user")
const {isLoggedIn} = require("./middlewares/auth")

const app = express();

app.set("view engine" , "ejs")
app.set("views" , path.resolve("./views"))

//Middlewares
app.use(express.json());
app.use((express.urlencoded({extended:true})))
app.use(cookieParser())


//Connection
connectMongoDb(process.env.MONGO_URL);

app.use("/url",isLoggedIn, urlRoute); 
app.use("/" ,userRoute)
app.use("/" ,staticRoute)




app.listen(PORT, console.log(`server is running at PORT : ${PORT}`));
