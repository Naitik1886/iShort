// Only load dotenv in development
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log('Environment PORT:', process.env.PORT);
console.log('Environment NODE_ENV:', process.env.NODE_ENV);

const express = require("express");
const PORT = process.env.PORT || 8001;
const path = require('path');
const cookieParser = require("cookie-parser");

const { connectMongoDb } = require("./connect");

const urlRoute = require("./routers/url");
const staticRoute = require('./routers/staticRouter');
const userRoute = require("./routers/user");
const { isLoggedIn } = require("./middlewares/auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB Connection - Railway provides MONGO_URL automatically
const mongoUrl = process.env.MONGO_URL || process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/url';
console.log('Connecting to MongoDB...');
connectMongoDb(mongoUrl);

app.use("/url",isLoggedIn, urlRoute); 
app.use("/" ,userRoute)
app.use("/" ,staticRoute)




app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
