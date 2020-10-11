const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    user_id: { 
        type: Number,
        required: true
    }, 
    cardholder_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    money_value: {
        type: Number,
        required: true
    }, 
    cluster_0: {
        type: Number,
        required: true
    }, 
    cluster_1: {
        type: Number,
        required: true
    },
    cluster_2: {
        type: Number,
        required: true
    },
    cluster_3: {
        type: Number,
        required: true
    },
    cluster_4: {
        type: Number,
        required: true
    }
})

module.exports = model('User', userSchema)