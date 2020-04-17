
    const User = require('../controllers/user.controller');
    const authJwt  = require('../middleware/authJwt');
    const express = require('express');
    const router = express.Router();



    // Create a new 
    router.post('/api/Register', User.create);
    router.post('/api/login', User.login);

    router.get('/api/auth', [authJwt.verifyToken] , User.auth );


    module.exports = router;

    