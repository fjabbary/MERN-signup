const express = require('express')
const router = express.Router();
const signupTemplate = require('../models/SignupModel')
const bcrypt = require('bcrypt')

router.post('/signup', async (req, res) => {

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, saltPassword)

    const signedupUser = new signupTemplate({
        fullName: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        password: securePassword
    })

    signedupUser.save()
        .then(data => res.json(data))
        .catch(err => res.json(err))
})



module.exports = router