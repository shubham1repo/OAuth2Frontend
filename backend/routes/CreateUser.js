const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const jwtSecret="MyNameIsShubham"

router.post("/createUser",
    body('email', 'incorrect email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 }),
    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const salt = await bcrypt.genSalt(10)
        const secPassword = await bcrypt.hash(req.body.password, salt)
        try {
            await User.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: secPassword
            })
            res.json({ sucess: true })
        }
        catch (error) {
            console.log(error)
            res.json({ sucess: false })
        }
    })

router.post("/loginUser",
    body('email', 'incorrect email').isEmail(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email
        try {
            let userData = await User.findOne({ email })
            if (!userData)
                return res.status(400).json({ errors: "Trry logging with correct credentials" });
            const pwdcompare = await bcrypt.compare(req.body.password,userData.password)
            console.log(pwdcompare)
            if (!pwdcompare) {
                return res.status(400).json({ errors: "Tryy logging with correct credentials" });
            }
            const data ={
                user:{
                    id:userData.id
                }
            }
            const authToken=jwt.sign(data,jwtSecret)
           return res.json({ sucess: true,authT:authToken })
        }
        catch (error) {
            console.log(error)
            res.json({ sucess: false })
        }
    })

module.exports = router;