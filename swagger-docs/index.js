const express = require("express")

const app = express()

const PORT = 4000

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const fileUpload = require('express-fileupload')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json()) // To parse JSON to POST data
app.use(fileUpload())

let courses = [
    {
        id: "11",
        name: "Learn ReactJS",
        price: 299
    },
    {
        id: "22",
        name: "Learn Angular",
        price: 399
    },
    {
        id: "33",
        name: "Learn Django",
        price: 499
    },
]

app.get("/", (req, res) => {
    res.send("Hello from Sam");
})

app.get("/api/v1/sam", (req, res) => {
    res.send("Hello from Sam Docs")
})

app.get("/api/v1/object", (req, res) => {
    res.send({ id: "55", name: "Learn backend", price: 999 })
})

app.get("/api/v1/courses", (req, res) => {
    res.send(courses)
})

// Information come from courseId in path
app.get("/api/v1/mycourse/:courseId", (req, res) => {
    const myCourse = courses.find(course => course.id == req.params.courseId)
    res.send(myCourse)
})

app.post("/api/v1/addCourse", (req, res) => {
    console.log(req.body)
    courses.push(req.body)
    res.send(true)
})

// Using Query
app.get("/api/v1/coursequery", (req, res) => {
    let location = req.query.location
    let device = req.query.device

    res.send({ location, device })
})

// Handling the image
app.post("/api/v1/courseupload", (req, res) => {
    console.log(req.headers)
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"

    // Handling errors
    file.mv(path, (err) => {
        res.send(true)
    })
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}...`);
})