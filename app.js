const express = require("express");
const dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
const userRoute = require("./routes/userRoutes");
const authRoute = require("./routes/authRoutes");
const storeRoute = require("./routes/storeRoutes");
const itemRoute = require("./routes/itemRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./errorController/errorController");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

app.use("/api/users",userRoute);
app.use("/api/auth", authRoute);
app.use("/api/stores/items", itemRoute)
app.use("/api/stores", storeRoute);


const DB = process.env.DATABASE_URL.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{useNewUrlParser:true
}).then(con=>{
    // console.log(con.connections);
    console.log("DB connection successful");
})

app.get("/", (req,res)=>{
    res.status(200).json({
        status: 'success',
        message: "welcome to the express app...",
    });
});

app.all('*', (req,res,next)=>{
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't find ${req.originalUrl} on this server`
    // });
    // const err = new Error(`Can't find ${req.originalUrl} on this server`);
    // err.status = 'fail',
    // err.statusCode = 404;
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
})
// error handling middleware

app.use(globalErrorHandler);

app.listen(3000, ()=>{
    console.log("App running on port 3000.....");
});
