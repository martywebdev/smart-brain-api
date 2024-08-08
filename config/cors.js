const cors = require('cors');

const corsOptions = {
    origin: process.env.CORS_ALLOWED_ORIGIN,
    methods: process.env.CORS_METHODS || 'GET,POST,PUT,DELETE',
    allowedHeaders: process.env.CORS_ALLOWED_HEADERS || 'Content-Type,Authorization',
    credentials: true,
};

module.exports = cors(corsOptions);