const express = require('express');
const cors = require('cors');
const logger = require('morgan')

const userRouter = require('./routers/users')

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger('dev'))

app.get("/", (req, res) => {
    res.json({
        name: "sound_safari_api",
        description: "swing through the music jungle"
    })
})

app.use("/users", userRouter);

module.exports = app;
