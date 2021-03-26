const mongoose = require('mongoose')

const UserSchema  = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20
    }

});
  


const Users = mongoose.model('User', UserSchema)

module.exports = Users;
