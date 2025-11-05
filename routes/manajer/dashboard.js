const express = require('express')

const Manajer = require('../../models/Manajer')
const { authManajer } = require('../../middlewares/auth')

const router = express.Router()

router.get('/', authManajer, async(req, res) => {
    try {
        const manajer = await Manajer.getNama(req.session.manajerId)

        res.render('konten-manajer/dashboard', {manajer})
    } catch (err) {
        console.error(err)
        req.flash('error', 'Internal server error')
        res.redirect('/')
    }
})

module.exports = router