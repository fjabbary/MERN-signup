const express = require('express')
const router = express.Router();
const signupTemplate = require('../models/SignupModel')
const bcrypt = require('bcrypt')

//Add a new user to DB
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

//Get users from DB
router.get('/grab', (req, res) => {
    signupTemplate.find().then(data => {
        res.json(data)
    })
})

//Delete user from DB
router.delete('/delete', (req, res) => {
    signupTemplate.deleteOne({ _id: req.body.id })
        .then(data => res.json(data))
})



module.exports = router