const {Schema, model} = require('mongoose')

const transactionSchema = new Schema({
    user_id: {
        //type: Schema.Types.ObjectId, 
        type: Number,
        required: true
    }, 
    transaction_id: {
        //type: Schema.Types.ObjectId,
        type: Number,
        required: true
    }, 
    amount: {
        type: Number, 
        required: true
    }, 
    region: {
        type: String, 
        required: true
    }
})

module.exports = model('Transaction', transactionSchema)
