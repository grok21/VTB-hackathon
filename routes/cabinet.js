const {Router} = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.render('cabinet/main_page', {
        title: 'Cabinet',
        isCabinet: true
    })
})

module.exports = router