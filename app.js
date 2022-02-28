require('dotenv').config();
require('express-async-errors');


const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const productsRouter = require('./routes/products');

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');


const PORT = process.env.PORT || 4000;
const URL = process.env.MONGO_URI_STORE;
// route
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

app.use('/api/v1/products', productsRouter);

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    // connect DB
    await connectDB(URL);
    // start server
    app.listen(PORT, () => {
      console.log(`Listening for port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();