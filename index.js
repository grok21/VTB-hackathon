const express = require('express')
const mongoose = require('mongoose')
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
    const user = new User({user_id: '1', email: '123@gb.com', password: '1234', name: 'Vadim'})
    await user.save()

    /*
    const transaction = new Transaction({user_id: '1', transaction_id: '1', amount: 1234, region: 'Russia'})
    await transaction.save()
    */
}

start()