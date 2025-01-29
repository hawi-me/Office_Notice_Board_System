const express = require('express');
const dotenv = require('dotenv');
const { errorHandler} = require('./Middleware/errorMiddleware');
const port =  process.env.PORT || 5000

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/notice', require('./Routes/noticeRoutes'));
app.use(errorHandler)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});