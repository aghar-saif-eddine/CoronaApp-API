const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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
     // const password = req.body.password;
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
exports.auth = (req,res,next) =>{   
        return res.status(200).send({message:" validation"});
}