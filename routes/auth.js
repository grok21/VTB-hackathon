const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('auth/login', {
        title: 'Login page',
        isHome: true
    })
})

router.post('/', async (req, res) => {
    req.session.isAuthenticated = true
    res.redirect('/home')
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router