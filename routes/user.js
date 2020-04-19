
    const User = require('../controllers/user.controller');
    const authJwt  = require('../middleware/authJwt');
    const express = require('express');
    const router = express.Router();
    const demande = require('../controllers/user.controller')

    // Create a new  
    router.post('/api/Register', User.create);
   
    // login to a compte
    router.post('/api/login', User.login);
   
    // authentification
    router.get('/api/auth', [authJwt.verifyToken] , User.auth );

    // get profile
    router.get('/api/profile/me', [authJwt.verifyToken] , User.profile );

    // create a new demande  
    router.post('/api/addDemande', [authJwt.verifyToken], demande.addDemande );
   
    // get all demandes 
    router.get('/api/AllDemande', [authJwt.verifyToken],demande.getAllDemande);
    
    // get by adresse 
    router.get('/api/demande/adresse/' ,[authJwt.verifyToken],demande.getDemandeByAdresse)

    // delete Demande
   router.delete('/api/deleteDemande/:id',[authJwt.verifyToken], demande.delteDemande)
   
   // get demande current user 
   router.get('/api/getMYDemande/' ,[authJwt.verifyToken],demande.getMYDemande)
   
   //  get deatail demande (id demande) 
   router.get('/api/getDetailDemande/:id' ,[authJwt.verifyToken],demande.getDetailDemande)


    module.exports = router;

    