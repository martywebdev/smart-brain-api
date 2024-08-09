const express = require('express')
const app = express()
const cors = require('./config/cors.js');
const morgan = require('morgan')
const helmet = require('helmet')
const limiter = require('./config/rateLimiter.js')
const routes = require('./routes'); 
//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors)
app.use(morgan('combined'))
app.use(helmet())
app.use(limiter)


app.get('/', async (req, res) => {
  res.send('its working')
})

app.use('/api', routes);

// 404 Not Found Handler
app.use((req, res) => {
  res.status(404).json({
    status: 404,
    message: 'Resource not found',
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: err.message || 'Internal Server Error',
  });
});


const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`app is running on port ${PORT}`))