const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('auth/login', {
        title: 'Login page',
        isHome: true
    })
})

router.post('/login', async (req, res) => {
    req.session.isAuthenticated = true
    res.redirect('/home')
})

module.exports = router