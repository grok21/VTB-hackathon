const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    user_id: {
        //type: Schema.Types.ObjectId, 
        type: Number,
        required: true
    }, 
    login: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = model('User', userSchema)