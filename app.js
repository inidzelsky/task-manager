'use strict';

const express = require('express');
const app = express();

const PORT = process.env.PORT || 5000;

//Implementing router
app.use('/api/register', require('./router/register'));
app.use('/api/auth', require('./router/auth'));
app.use('/api/tasks', require('./router/tasks'));

app.listen(PORT, () => console.log(`Server started on the port ${PORT}`));