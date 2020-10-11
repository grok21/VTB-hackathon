const {Router} = require('express')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {
    res.render('index', {
        title: 'Main page',
        isHome: true
    })
})

module.exports = router