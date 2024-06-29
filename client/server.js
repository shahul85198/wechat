const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect()

app.listen(5000, () => {
    console.log('server running.....')
})