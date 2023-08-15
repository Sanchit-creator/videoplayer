const express = require('express');
const app = express();
const PORT  = 3000;
const db = require('./config/database');
const bodyParser = require('body-parser');
const router = require('./routes');
const cors = require('cors');


app.use('/uploads',express.static('uploads'));
app.use(cors());
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
    console.log(`Server Listening on ${PORT}`);
})