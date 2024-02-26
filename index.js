
const dotenv = require('dotenv').config();
const express =  require('express');
//const router = express.Router()
const connectToMongo=require('./config/db');
const app=express();
const bodyParser = require('body-parser');

const internRouter = require('./router/InternRoute')
const alumniRouter = require('./router/alumniRoute')
const newsRouter = require('./router/newsRouter')
const eventRouter = require('./router/eventRoute')
const teamRouter = require('./router/teamRoute')
const careerRouter=require('./router/careerRoute')
const contactRouter=require('./router/contactRouter')
const AcheiveRouter=require('./router/acheiveRoute')

const { notFound, errorHandler} = require('./middleware/errorhandler')

const port = process.env.PORT ||6000;

const cookieParser = require ( 'cookie-parser')
const morgan = require('morgan')
const path = require("path")
// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public",express.static(path.join(__dirname,"public")))

connectToMongo();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.use(cookieParser())




app.get("/",(req,res)=>{
    res.send("<h1>hiiiiiiiiiiiiiiiiiiiiiiii</h1>");
})


app.use('/api/intern', internRouter)
app.use('/api/alumni' , alumniRouter)
app.use('/api/news' , newsRouter)
app.use('/api/event' , eventRouter)
app.use('/api/team' , teamRouter)
app.use('/api/career' , careerRouter)
app.use('/api/contact' , contactRouter)
app.use('/api/acheive' , AcheiveRouter)

app.use(notFound)
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is running at port:${port}`);
})