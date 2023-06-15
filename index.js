const express = require('express');
const cors = require('cors');
require('dotenv').config();

const dbConnection = require('./database/config');

const app = express();

// DB
dbConnection();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));