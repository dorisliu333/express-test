require('dotenv').config();
const express = require('express');
require('express-async-errors')
const morgan = require('morgan');
const cors = require('cors');

const router = require('./routes');
const errorHandler = require('./middleware/errorhandler')


const app = express();

const morganLog = process.env.NODE_ENV === 'production' ? morgan('common'):morgan('dev')
app.use(morganLog)
app.use(cors());
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("welcome to jr cms!")
})


app.use('/api',router)
app.use(errorHandler)
module.exports = app;

