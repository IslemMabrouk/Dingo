const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password:String,
    phone: String,
    role: String,
    speciality: String,
    experience : String,
    dateOfBirth : String

});

const user = mongoose.model('User', userSchema);

module.exports = user;
