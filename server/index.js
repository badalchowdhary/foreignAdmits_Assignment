const express = require('express');
const cors = require('cors');
const { connectToMongoDB } = require('./config');
const dotenv = require("dotenv");
dotenv.config();

const studentRoute = require('./src/routes/studentRoute');
const universityRoute = require('./src/routes/universityRoute');
const bankRoute = require('./src/routes/bankRoute');
const authRoute = require('./src/routes/authRoute')

const app = express();


app.use(cors({
    origin: '',
}));

//Middleware to parse data
app.use(express.json());

app.use("/api/auth", authRoute);
app.use('/api/student', studentRoute);
app.use('/api/university', universityRoute);
app.use('/api/bank', bankRoute);

//Connecting to Database
connectToMongoDB().
then(() => console.log("Conneted to MongoDB"))
.catch((err)=>{
    console.log(err)
});

app.listen(process.env.PORT, ()=>{
    console.log(`Server started at ${process.env.PORT}`);
})