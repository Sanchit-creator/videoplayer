const adminController = require('../controllers/admin_controller')
const express = require('express');
const router = express.Router();
const protect = require('../middlewares/authMiddleware')

router.post('/register-admin', adminController.signUp)
router.post('/login', adminController.signIn)
router.post('/delete/:id', protect, adminController.destroy)
router.get('/users', protect, adminController.fetchUsers)
router.get('/user/:id', protect, adminController.user)
router.patch('/update/:id', protect, adminController.edit)

module.exports = router;

