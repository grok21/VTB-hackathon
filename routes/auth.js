const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/', (req, res) => {
    res.render('auth/login', {
        title: 'Login page',
        isHome: true
    })
})

/*
router.post('/', async (req, res) => {
    try {
        const {email, password} = req.body
        
        // Trying to find this user
        const candidate = await User.findOne({ email })

        // If user exists - check passed password 
        if(candidate) {

            // Check passed password and provide access to account
            const isSame = password === candidate.password 
            if (isSame) {
                req.session.user = candidate
                req.session.isAuthenticated = true
                req.session.save((err) => {
                    if(err) {
                        throw(err)
                    } else {
                        res.redirect('/')
                    }
                })
                res.redirect('/home')

            // If password isn't correct - try again
            } else {
                res.redirect('/')
            }

        // If user doesn't exist - try again
        } else {
            res.redirect('/')
        }
    } catch(e) {
        console.log(e)
    }
})
*/

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