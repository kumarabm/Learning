const express = require('express');
const app = express();


const swaggerUi = require('swagger-ui-express')
const YAML = require('yamljs')
const swaggerJsDoc = YAML.load("./api.yaml")

app.use("/learning", swaggerUi.serve, swaggerUi.setup(swaggerJsDoc))

const { errorHandler } = require('./errorhandler')
require("dotenv").config();
require("./db_config");

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const router = require('./router/company')
app.use('/', router)

const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send('Welcome to my page!');
});

app.use(errorHandler)

app.listen(port, () => {
    console.log(`port is running on ${port}`)
})