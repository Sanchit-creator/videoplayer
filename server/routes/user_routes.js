const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controllers')
const uploads = require('../middlewares/upload')
const protect = require('../middlewares/authMiddleware')

router.post('/signup', uploads.fields([
    {name: 'adhaarphotoone', maxCount: 1},
    {name: 'adhaarphototwo', maxCount: 1},
    {name: 'document', maxCount: 1}
]), userController.signUp)

router.post('/login', userController.signIn)
router.post('/post', protect, uploads.fields([
    {name: 'path', maxCount: 1},
    {name: 'thumbnail', maxCount: 1}
]), userController.postVideo)
router.get('/get', protect, userController.getVideos)
router.get('/getone/:id', protect, userController.getOneVideo);

module.exports = router