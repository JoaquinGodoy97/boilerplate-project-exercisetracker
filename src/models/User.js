let mongoose = require('mongoose')

let UserSchema = new mongoose.Schema({
    username : {
        type: String,
        require: true,
        unique: true
    }
})

module.exports = mongoose.model('User', UserSchema);