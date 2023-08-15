const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    gender: {
        type: String
    },
    nationality:{
        type: String
    },
    adhaarnumber:{
        type: String
    },
    adhaarphotoone:{
        type: String
    },
    adhaarphototwo:{
        type: String
    },
    idnumber:{
        type: String
    },
    document:{
        type: String
    },
    userid:{
        type: String
    },
    password: {
        type: String
    },
    is_verified: {
        type: String
    },
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Video'
        }
    ]
}, {
    timestamps: true,
})

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 12);
    }
    next();
})

const User = mongoose.model('User', userSchema);
module.exports = User;





