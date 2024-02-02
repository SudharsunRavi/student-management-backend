const express = require('express');
const app = express();

const dotenv = require('dotenv').config();

const dbConnection = require('./config');
dbConnection();

const studentRoutes = require('./routes/studentRoutes');

app.use(express.json());

app.use('/api/v1/students', studentRoutes);

app.listen(3000, (req, res)=>{
    console.log('Server is running on port 3000');
})