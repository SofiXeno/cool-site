const router = require('express').Router()
const Request = require('../../db/request')
const config = require('../../config.json')
const nodemailer = require('nodemailer')
const selectLang = require('../select-lang')

function createConfirmationMessage(lang, url) {
    console.log( lang.confirmationMessage + url)
    return lang.confirmationMessage + url
}

const transporter = nodemailer.createTransport({

    host: 'smtp.mail.yahoo.com',
    port: 465,
    service:'yahoo',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    debug: false,
    logger: true ,

});

router.get('/', async (req, res) => {
    return res.json(await Request.find())
})

router.post('/:lang', async (req, res) => {
    const request = new Request({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        message: req.body.message,
        confirmed: !config.adminConfirmation
    })

    let doc

    try {
        doc = await request.save()
    } catch (e) {
        console.log(e)
        return res.status(400).json(e)
    }

    const lang = selectLang(req.params.lang)

    if (config.adminConfirmation) {
        const mailOptions = {
            from: process.env.EMAIL,
            to: request.email,
            subject: 'Підтвердження заявки/Request confirmation',
            text: createConfirmationMessage(lang, `http://localhost:8000/requests/confirm/${doc._id}?lang=${lang.localeName}`)
        };
        try {
            await transporter.sendMail(mailOptions);
            return res.redirect(`/needConfirm?lang=${req.params.lang || 'ua'}`)
        } catch (e) {
            console.log(`Mailing finished with ${e.message}`);
            return res.status(406).json({fail:true})
        }
    }
    return res.redirect(`/confirmed?lang=${req.params.lang || 'ua'}`)
})

router.post('/delete/:id', async (req, res) => {
    try {
        await Request.deleteOne({_id: req.params.id})
        res.redirect('/admin')
    } catch (e) {
        return res.json(e)
    }
})

router.get('/confirm/:id', async(req, res) => {
        await Request.updateOne({_id:req.params.id}, {confirmed:true})
        res.redirect(`/confirmSuccess?lang=${req.query.lang}`)
    }
)

module.exports = router