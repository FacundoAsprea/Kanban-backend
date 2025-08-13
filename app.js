const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

const env = require("./utils/config")
const taskController = require("./controllers/tasks.controller")

app.use(cors())
app.use(express.json())

mongoose.connect(env.MONGO_URL)
.then(() => console.log("Connected to MONGODB"))
.catch(() => console.error("Error trying to connect to MONGODB"))

app.use("/tasks", taskController)

module.exports = app