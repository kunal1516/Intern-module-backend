const dotenv = require("dotenv").config();
const express = require("express");
//const router = express.Router()
const connectToMongo = require("./config/db");
const app = express();
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const internRouter = require("./router/InternRoute");
const alumniRouter = require("./router/alumniRoute");
const newsRouter = require("./router/newsRouter");
const eventRouter = require("./router/eventRoute");
const teamRouter = require("./router/teamRoute");
const careerRouter = require("./router/careerRoute");
const contactRouter = require("./router/contactRouter");
const AcheiveRouter = require("./router/acheiveRoute");
const superAdminRouter = require("./router/superAdminRoute");
const galleryRouter = require("./router/galleryRoute")
const adminInternRouter = require('./router/adminInternRoute')

const { notFound, errorHandler } = require("./middleware/errorhandler");

const port = process.env.PORT || 4000;

const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

connectToMongo();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("<h1>Welcome To the Intern Module</h1>");
});

app.use("/api/intern", internRouter);
app.use("/api/alumni", alumniRouter);
app.use("/api/news", newsRouter);
app.use("/api/event", eventRouter);
app.use("/api/team", teamRouter);
app.use("/api/career", careerRouter);
app.use("/api/contact", contactRouter);
app.use("/api/acheive", AcheiveRouter);
app.use("/api/superAdmin", superAdminRouter);
app.use("/api/gallery", galleryRouter);
app.use("/api/adminIntern" , adminInternRouter)

//Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node JS API Project for mongodb",
      version: "1.0.0",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: [
    "./router/alumniRoute.js",
    "./router/internRoute.js",
    "./router/eventRoute.js",
    "./router/newsRouter.js",
  ],
};
//   ii
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/contact", contactRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
