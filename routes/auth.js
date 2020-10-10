const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('auth/login', {
        title: 'Login page',
        isHome: true
    })
})

module.exports = router