const router = require('express').Router()
const Training = require('../../db/training')

router.get('/', async (req, res) => {
    return res.json(await Training.find())
})

router.post('/:lang', async (req, res) => {
    const training = new Training({
        en: {
            title: req.body.titleEn,
            subtitle: req.body.subtitleEn,
            smallText: req.body.smallTextEn,
            bigText: req.body.bigTextEn
        },
        ua: {
            title: req.body.titleUa,
            subtitle: req.body.subtitleUa,
            smallText: req.body.smallTextUa,
            bigText: req.body.bigTextUa
        },
        date:req.body.date,
        author:req.body.author
    })
    try {
        await training.save()
        res.redirect(`/admin?lang=${req.params.lang}`)
    } catch (e) {
        return res.status(400).json(e)
    }
})

router.post('/delete/:lang/:id', async (req, res) => {
    try{
        console.log(req.params.id)
        const data = await Training.deleteOne({_id:req.params.id})
        console.log(data)
        res.redirect(`/admin?lang=${req.params.lang}`)
    }catch (e) {
        return res.json(e)
    }
})

module.exports = router