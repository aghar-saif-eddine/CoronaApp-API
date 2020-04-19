const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const demandeSchema = new mongoose.Schema({
    
    title: { 
        type: String,
        required:true,
    },
    description: {
        type:String,
        required:true,
        
    },
    status: {
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
     publisher: {  
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
     acceptateur: {
         type: Schema.Types.ObjectId,
         ref: 'User'
    }  
    
});

  
module.exports= mongoose.model('demande',demandeSchema);