const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: false,limit: '50mb'}));
app.use(bodyParser({limit: '50mb'}));

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology:true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const carsRouter = require('./routes/cars');

app.use('/cars', carsRouter);

// function getCars(){

// }

// function updateRecords(){

// }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

