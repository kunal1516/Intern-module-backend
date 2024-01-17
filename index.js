const express =  require('express');
//const router = express.Router()
const connectToMongo=require('./config/db');
const app=express();
const dotenv = require('dotenv')
const bodyParser = require('body-parser');
require('dotenv').config();

const internRouter = require('./router/InternRoute');

const { notFound, errorHandler} = require('./middleware/errorhandler')

const port = process.env.PORT ||6000;

const bodyParser = require('body-parser');
const cookieParser = require ( 'cookie-parser')
const morgan = require('morgan')

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

connectToMongo();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.use(cookieParser())




app.get("/",(req,res)=>{
    res.send("<h1>hiiiiiiiiiiiiiiiiiiiiiiii</h1>");
})


app.use('/api/intern', internRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is running at port:${port}`);
})