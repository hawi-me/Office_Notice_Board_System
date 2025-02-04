const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const { errorHandler} = require('./Middleware/errorMiddleware');
const connectDB = require('./Config/db');
const port =  process.env.PORT || 5000
require('dotenv').config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/notice', require('./Routes/noticeRoutes'));
app.use('/api/users', require('./Routes/userRouter'));

app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});