const User = require('../models/user');
const bcrypt = require('bcryptjs');
const Video = require('../models/video')
const generateToken = require('../utils/generateToken');

module.exports.signUp = async (req, res) => {
    try {
        const exist = await User.findOne({email: req.body.email})
        if (exist) {
            return res.status(401).json({ message: 'Admin already registered'});
        }
        const user = req.body;
        const newUser = new User({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            nationality: req.body.nationality,
            adhaarnumber: req.body.adhaarnumber,
            idnumber: req.body.idnumber,
            userid: req.body.userid,
            password: req.body.password,
            is_verified: req.body.is_verified,
        });
        if (req.files.adhaarphotoone) {
            newUser.adhaarphotoone =  req.files.adhaarphotoone[0].path;
        }
        if (req.files.adhaarphototwo) {
            newUser.adhaarphototwo = req.files.adhaarphototwo[0].path
        }
        if (req.files.document) {
            newUser.document = req.files.document[0].path;
        }
        await newUser.save();
        res.status(200).json({
            message: user
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.signIn = async (req, res) => {
    try {
        let user = await User.findOne({email:req.body.email})
        if (user) {
            let isMatch = await bcrypt.compare(req.body.password, user.password);
            if (isMatch) {
                return res.status(200).json({
                    email:req.body.email,
                    password: req.body.password,
                    id: user._id,
                    verification: user.is_verified,
                    user: 'user',
                    token: generateToken(user._id)
                })
            }else{
                return res.status(401).json('Invalid Login')
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json('Error ', error.message);
    }
}


module.exports.postVideo = async(req, res) => {
    try {
        const user = await User.findOne({_id: req.body.id})
        if (user) {
            const newVideo = new Video({
                subtitle: req.body.subtitle,
                user: user
            })
            if (req.files.path) {
                newVideo.path = req.files.path[0].path
            }
            if (req.files.thumbnail) {
                newVideo.thumbnail = req.files.thumbnail[0].path
            }
            user.videos.push(newVideo)
            await user.save();
            await newVideo.save()
            const result = await Video.find();
            res.status(200).json(result)
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.getVideos = async(req, res) => {
    try {
        const result = await Video.find();
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.getOneVideo = async(req, res) => {
    try {
        const result = await Video.findOne({_id: req.params.id});
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}





