const express = require('express');
const { signUp , login, getAll, gets, updateSuperAdmin, handleRefreshToken, deleteSuperAdmin , logout ,updatePassword} = require('../controller/superAdminCtrl');
const router = express.Router();


router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout',logout);
router.get('/',getAll);
router.get('/:id',gets);
router.get('/refresh',handleRefreshToken);
router.put('/:id',updateSuperAdmin);
router.put('/:id',updatePassword);
router.delete('/:id',deleteSuperAdmin);


module.exports = router;