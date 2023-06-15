const express = require('express');
require('dotenv').config();

const dbConnection = require('./database/config');

const app = express();

// DB
dbConnection();

const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));