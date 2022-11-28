const express = require("express");
const app = express();
const mongoose = require("mongoose");
const WKA = require("../model/wka");
const cors = require("cors")
require('dotenv').config();

mongoose.connect(process.env.DB_CONNECTION_STRING, {useUnifiedTopology: true,useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
app.use(cors())

const countRouter = require('../routes/count')
app.use('/api/count', countRouter)

const coordinatesRouter = require('../routes/coordinates')
app.use('/api/coordinates', coordinatesRouter)

const getByIdRouter = require('../routes/getById')
app.use('/api/getById', getByIdRouter)

const graph1Router = require('../routes/graph1')
app.use('/api/graph1', graph1Router)

const graph2Router = require('../routes/graph2')
app.use('/api/graph2', graph2Router)

const graph3Router = require('../routes/graph3')
app.use('/api/graph3', graph3Router)

const graph4Router = require('../routes/graph4')
app.use('/api/graph4', graph4Router)

const graph5Router = require('../routes/graph5')
app.use('/api/graph5', graph5Router)

app.get('/shutdown', function(req, res) {
    res.send('shutdown');
    console.info('shutdown received.');
    db.close(false);
    console.log('MongoDb connection closed.');
    console.log('Closing http server.');
    server.close();
    console.log('Http server closed.');
});

const server = app.listen(process.env.PORT, () => console.log('Server Started'));

module.exports = app