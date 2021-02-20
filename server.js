const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config()
const PORT = process.env.PORT;

const listener = app.listen(PORT, (req, res) => {
    console.log(`Listening on port ${listener.address().port}`)
})

app.use(express.static("public"))
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/views/index.html`)
})