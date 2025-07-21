const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    shortID : {
        type:String,
        required:true,
        unique:true,
    },

    mainUrl:{
        type:String,
        required:true,
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }

})

const Url = mongoose.model('url' , urlSchema);

module.exports = Url;

