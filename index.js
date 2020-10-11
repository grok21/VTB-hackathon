const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const path = require('path')
const csrf = require('csurf')
const exphbs = require('express-handlebars')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
const User = require('./models/user')
const Transaction = require('./models/transaction')
const keys = require('./keys/keys.dev.js')
const homeRoutes = require('./routes/home')
const authRoutes = require('./routes/auth')
const cabinetRoutes = require('./routes/cabinet')
const varMiddleware = require('./middleware/variables')

const app = express()

// Creating handlebars engine
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs', 
    helpers: require('./utils/hbs-helpers'),
    allowProtoMethodsByDefault: true, 
    allowProtoPropertiesByDefault: true
})

// Saving sessions in MongoDB
const store = new MongoStore({
    collection: 'sessions', 
    uri: keys.MONGODB_URI
})

// Handlebars-engine register
app.engine('hbs', hbs.engine)

// Handlebars-engine activating 
app.set('view engine', 'hbs')

// Pages folder register (folder views)
app.set('views', 'views')

// Styles and images folder register
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use(session({
    secret: 'secret phrase',
    resave: false,
    saveUninitialized: false, 
    store
}))
app.use(csrf())
app.use(helmet())
app.use(varMiddleware)


// Routes 
app.use('/', authRoutes)
app.use('/home', homeRoutes)
app.use('/cabinet', cabinetRoutes)

const PORT = process.env.PORT || 3000

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

    /*
    const user = new User({user_id: '-1', cardholder_name: 'Vadim', email: '123@gb.com', password: '1234', money_value: 100, cluster_0: 1, cluster_1: 0, cluster_2: 0, cluster_3: 1, cluster_4: 0})
    await user.save()

    /*
    const transaction = new Transaction({transaction_id: '-1', user_id: '-1',  cardholder_name: 'Vadim', transaction_amount: 10, division: 3, cluster: 2})
    await transaction.save()
    */

/*
   const user1 = new User({user_id: '1', cardholder_name: 'DONNA MARIE HEPP', email: 'donna_marie_hepp@hack.ru', password: 'MMZlUwGwKWZfr9Xik6an', money_value: 987, cluster_0: 1, cluster_1: 0, cluster_2: 1, cluster_3: 0, cluster_4: 1})
   await user1.save()

const user2 = new User({user_id: '2', cardholder_name: 'ANTOLIN ALDAY', email: 'antolin_alday@yandex.ru', password: 'InwPUe4iTs3dpXbXpLv', money_value: 3548, cluster_0: 1, cluster_1: 0, cluster_2: 1, cluster_3: 0, cluster_4: 0})
   await user2.save()

const user3 = new User({user_id: '3', cardholder_name: 'CECILE PHAM', email: 'cecile_pham@mail.ru', password: 'e91tEbWwzR4zcKZ9WWY', money_value: 3345, cluster_0: 1, cluster_1: 0, cluster_2: 0, cluster_3: 0, cluster_4: 0})
   await user3.save()

const user4 = new User({user_id: '4', cardholder_name: 'GREG CONNOLLY', email: 'greg_connolly@gmail.com', password: 'tsmUI7dSfFRwisPXcrnpPeF', money_value: 4130, cluster_0: 1, cluster_1: 0, cluster_2: 0, cluster_3: 0, cluster_4: 1})
   await user4.save()

const user5 = new User({user_id: '5', cardholder_name: 'BRENDA MERCADO', email: 'brenda_mercado@hack.ru', password: 'FGz9gkp8MjoRw8GcLKHrZ', money_value: 2105, cluster_0: 1, cluster_1: 0, cluster_2: 0, cluster_3: 0, cluster_4: 0})
   await user5.save()
*/


}

start()