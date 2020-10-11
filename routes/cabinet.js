const {Router} = require('express')
const auth = require('../middleware/auth')
const router = Router()
const path = require('path')
const User = require('../models/user')
const {PythonShell} = require('python-shell')


router.get('/', auth, (req, res) => {
    res.render('cabinet/main_page', {
        title: 'Cabinet',
        isCabinet: true
    })
})

router.post('/transfer', auth, async (req, res) => {
    const { email } = req.body
    const candidate = await User.findOne({ email })
    const amount = req.body.amount

    const options = {
        mode: 'text', 
        scriptPath: path.join(__dirname, '../data_tables'),
        pythonOptions: ['-u'],
        args: [`${amount}`]
    }
    
    PythonShell.run('script.py', options, function (err, result) {
        if (err) {
            throw err
        }

        if(result[0]) {
            console.log('Transaction is ok')
        } else {
            console.log('Transaction is not ok')
        }
    })
    res.redirect('/cabinet')
})

module.exports = router