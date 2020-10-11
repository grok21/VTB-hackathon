const {Router} = require('express')
const auth = require('../middleware/auth')
const router = Router()

router.get('/', auth, (req, res) => {
    res.render('cabinet/main_page', {
        title: 'Cabinet',
        isCabinet: true
    })
})

module.exports = router