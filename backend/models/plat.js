const mongoose = require('mongoose');
const platSchema = mongoose.Schema({
    platName: String,
    price: String,
    description: String,
    idChef:String,
    img : String

});

const plat = mongoose.model('Plat', platSchema);

module.exports = plat;
