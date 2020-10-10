const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/user')
const Transaction = require('./models/transaction')
const keys = require('./keys/keys.dev.js')

const PORT = process.env.PORT || 3000

const app = express()

async function start() {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true, 
            useFindAndModify: false
        })

        app.listen(PORT, () => {
            console.log(`Server has been started on ${PORT}...`)
        })
    } catch (e) {
        console.log(e)
    }

    const user = new User({user_id: '1', login: 'pankus22', password: '1234', name: 'Vadim'})
    await user.save()

    const transaction = new Transaction({user_id: '1', transaction_id: '1', amount: 1234, region: 'Russia'})
    await transaction.save()
}

start()