const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    name: { 
        type: String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        validate: value => {
            if (!validator.isEmail(value)) {
                throw new Error({error: 'Invalid Email address'})
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    adresse: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

userSchema.methods.generateAuthToken =  function() {
    // Generate an auth token for the user
    const user = this ;
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY, { expiresIn: 86400 });
    user.tokens = user.tokens.concat({token});
     user.save();
    return token
}
  
module.exports= mongoose.model('User',userSchema);