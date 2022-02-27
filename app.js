require('dotenv').config();
// async errors

const express = require('express');
const app = express();

const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');


const PORT = process.env.PORT || 4000;

// route
app.get('/', (req, res) => {
  res.send('<h1>Store API</h1><a href="/api/v1/products">products route</a>');
});

// products route

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const start = async () => {
  try {
    // connect DB

    // start server
    app.listen(PORT, () => {
      console.log(`Listening for port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();