const express=require('express');
const mongoose = require('mongoose');
const { MONGODB_URL, PORT } = require('./utils');
const cors =require('cors')

const app = express();

mongoose.set("strictQuery", false);
app.use(cors())
app.use(express.json())

console.log('connecting to Mongodb')
mongoose.connect(MONGODB_URL)
console.log('connected to Mongodb')

app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})