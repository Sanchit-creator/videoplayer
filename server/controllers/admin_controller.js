const Admin = require('../models/admin');
const User = require('../models/user')
const Video = require('../models/video')
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { default: mongoose } = require('mongoose');

module.exports.signUp = async (req, res) => {
    try {
        const exist = await Admin.findOne({email: req.body.email})
        if (exist) {
            return res.status(401).json({ message: 'Admin already registered'});
        }
        const admin = req.body;
        const newAdmin = new Admin(admin);
        await newAdmin.save();
        res.status(200).json({
            message: admin
            
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


module.exports.signIn = async (req, res) => {
    try {
        let admin = await Admin.findOne({email:req.body.email})
        if (admin) {
            let isMatch = await bcrypt.compare(req.body.password, admin.password);
            if (isMatch) {
                return res.status(200).json({
                    email:req.body.email,
                    password: req.body.password,
                    user: 'admin',
                    token: generateToken(admin._id)
                })
            }else{
                return res.status(401).json('Invalid Login')
            }
        }
    } catch (error) {
        res.status(500).json('Error ', error.message);
    }
}

module.exports.fetchUsers = async (req, res) =>{
    try {
        const fetchData = await User.find();
        res.status(200).json(fetchData);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.edit = async (req, res) => {
    try {
        var newvalues = { $set: {
            name: req.body.name, 
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            gender: req.body.gender,
            nationality: req.body.nationality,
            adhaarnumber: req.body.adhaarnumber,
            adhaarphotoone: req.body.adhaarphotoone,
            adhaarphototwo: req.body.adhaarphototwo,
            idnumber: req.body.idnumber,
            document: req.body.document,
            userid: req.body.userid,
            is_verified: req.body.is_verified,
        } };
        const result = await User.updateOne({_id: req.params.id}, newvalues)
        const fetchData = await User.findOne({_id: req.params.id});
        res.status(200).json(fetchData)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.user = async(req, res) => {
    try {
        const user = await User.findOne({_id:req.params.id})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const exist = await User.findById(req.params.id);
        if (exist) {
            await exist.deleteOne();
            await Video.deleteMany({user: req.params.id})
            res.status(200).json({message: 'Deleted'})
        }
         else {
            res.status(404).json({ message: "Interview not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}




