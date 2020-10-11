const {Router} = require('express')
const auth = require('../middleware/auth')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
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
        req.session.trans_ok = Number(candidate[`${result[0]}`])
        if (req.session.trans_ok) {
            res.redirect('/cabinet')
        } else {
            res.redirect('/cabinet/validate')
        }
    })
})

router.get('/validate', auth, (req, res) => { 
    
    const secret = speakeasy.generateSecret({
        name: "VTB_authenticate"
    })

    req.session.secret = secret
    qrcode.toDataURL(secret.otpauth_url, function(err, data) {
        req.session.qrcode_url = data;
    })

    res.render('cabinet/validate', {
        title: 'Validate',
        isCabinet: true,
        qr_image: req.session.qrcode_url
    })
})

router.post('/validate', auth, (req, res) => {
    const verified = speakeasy.totp.verify({
        secret: req.session.secret['ascii'],
        encoding: 'ascii',
        token: req.body.token
    })

    console.log(verified)
    if (!verified) {
        res.redirect('/cabinet')
    } else {
        res.redirect('/cabinet/validate')
    }
})

module.exports = router