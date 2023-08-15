const mongoose = require('mongoose');

const conn_str = 'mongodb+srv://sanchit:sanchit@cluster0.r7yrcls.mongodb.net/?retryWrites=true&w=majority'
const db = mongoose.connect(
    conn_str,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }
).then(() => console.log('MongoDb Connected successfully'))
.catch((err) => {console.log(err)})

module.exports = db;

