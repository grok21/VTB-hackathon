const {Schema, model} = require('mongoose')

const transactionSchema = new Schema({
    transaction_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    }, 
    cardholder_name: {
        type: String,
        required: true
    }, 
    transaction_amount: {
        type: Number, 
        required: true
    }, 
    division: {
        type: Number, 
        required: true
    }, 
    cluster: {
        type: Number, 
        required: true
    }
})

module.exports = model('Transaction', transactionSchema)
