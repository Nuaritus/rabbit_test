const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router')
const app = express();
const connect = require('./send')

app.use(bodyParser.json())
app.use('/', router)

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is working on the port: ${PORT}`));