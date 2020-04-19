const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const Demande = require('../models/demande.model') ;

// Create and Save a new user
exports.create =  (req, res) => {
    //password_h = bcrypt.hash(req.body.password, 8);
    const user = new User({
        name : req.body.name,
        email: req.body.email,
        password : bcrypt.hashSync(req.body.password, 8),
        phone: req.body.phone,
        adresse : req.body.adresse
    });
     const  email= req.body.email;
        User.findOne({email }).then(
        data =>{
            if (data) {
                // User not found
                return res.status(401).send({ message: " email is already used" });
              }
                   user.save()
                .then(newUser => {
                    if(!newUser){
                        res.status(404).send({message :"errr"});
                    }
                    const token =  user.generateAuthToken();
                    res.status(201).send({message:"new user has been added +login " });
                }).catch(err => {
                    res.send(err.message);
                });
              
        }
    ).catch(err =>{
        res.send('error registration');
    });
    
   
};
// login user
exports.login =  (req, res) => {
      const email =req.body.email;
      // chek the  user name
  User.findOne({ email })
    .then(user => {
      if (!user) {
        // User not found
        return res.status(401).send({ message: " email or Password not found" });
      }
      // Check the password
      const passIsvalid=bcrypt.compareSync(req.body.password ,user.password)
      if (!passIsvalid) {
       return res.status(403).send({
       message: 'user password invalid'
       });
      }
     return res.status(200).send(user.tokens);
    }).catch(err =>{
                res.send('erro');
            })
       
}
//authentification user
exports.auth = (req,res,next) =>{   
        return res.status(200).send({message:" validation"});
}
// profile
exports.profile = (req , res ) => {
    User.findById(req.user)
    .exec()
    .then( data => {
        if (!data) {
            res.status(404).send({message:"user not found "})
        }
       res.status(200).send(data);
       })
        .catch(err =>{
        res.send({message:"err user"})
    });

}

// add a new demande
exports.addDemande = (req , res ,next )=> {
  
    const demande = new Demande({
        title : req.body.title,
        description: req.body.description,
        adresse :req.body.adresse,
        phone: req.body.phone,
        status: req.body.status,
       
    });
      demande.save().then(newDemande => {
        if(!newDemande){
            res.status(404).send({message :"errr"});
        }
            newDemande.publisher= req.user;
            newDemande.save().then(data =>{
                if(!data){
                    res.send({message:"cann't not save publisher"})
                }
                res.send({message:" publisher saved "})
            }).catch(err =>{
                console.log(err);
                
            })

           res.status(200).send({message:"new Demande has been posted " });
    }).catch(err => {
        res.send(err.message);
    });
}
// get all demande
exports.getAllDemande= (req, res )=>{
    Demande.find()
    .exec()
    .then(allDemande =>{
        res.status(200).send(allDemande);
    })
    .catch(err => {
        res.status(500).send({message:'Error'});
    });
}
// filtrage demande 
exports.getDemandeByAdresse = (req  , res )=> {
        User.findById(req.user)
        .exec()
        .then( data => {
            if (!data) {
                res.status(404).send({message:"user not found "})
            }
            Demande.find({adresse:{$in :data.adresse}}).exec().then(
                result =>{
                    if(!result){
                        res.status(404).send({message:" Demande is not found with thid adresse "});
                    }
                    res.status(200).send(result);
                }).catch(err =>{
                    res.send({message:"err demande"});
                })
        })
        .catch(err =>{
            res.send({message:"err user"})
        });

}
// delete a demande 
exports.delteDemande= (req,res)=>{
   const id = req.params.id;
    Demande.findByIdAndRemove({_id:id})
    .exec()
    .then(result =>{
    res.status(200).send({message:" Demande has been deleted with successful "})    
    })
    .catch(err =>{
        res.status(404).send(err);
    });
}
// Details Demande 
exports.getDetailDemande = (req,res)=>{
   const id = req.params.id;  
   Demande.findById({_id: id})
    .exec()
    .then(result =>{
         res.status(200).send(result);           
       })
    .catch(err =>{
         res.status(404).send(err);
    });
}
// get demande of current user
exports.getMYDemande= (req , res )=>{
    User.findById(req.user)
    .exec()
    .then( data => {
        if (!data) {
            res.status(404).send({message:"user not found "})
        }
        Demande.find({ publisher:{$in :data.id}}).exec().then(
            result =>{
                if(!result){
                    res.status(404).send({message:" user doesn't  have demande "});
                }
                res.status(200).send(result);
            }).catch(err =>{
                res.send({message:"erreur fetching  demande"});
            })
    })
    .catch(err =>{
        res.send({message:"erreur user"})
    });

}