const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const {isEmail} = require('validator');
const axios = require('axios');
const bcrypt = require('bcrypt')
require('dotenv').config();
const {SECRET_KEY} = process.env


const signupUser = async (req, res) => {        
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401)
        }
        if (!isEmail(email)) {
            return res.status(400).json({ status: false, message: "Enter valid email address." })
        }

        if (password.length < 6) {
            return res.status(400).json({ status: false, message: "Password length must be at least 6 characters." })
        }

        let isUser = await userModel.findOne({ email: email })

        if (isUser) {
            return res.status(400).json({ status: false, message: "Email already exists." })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        let user = await userModel.create({ email, password: hashedPassword })

        return res.status(201).json({ status: true, data: user })
    }
    catch (error) {
        return res.status(500).json({ status: false, message: error.message || error })
    }


}

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: false, message: "Enter email and password" })
        }

        if (!isEmail(email)) {
            return res.status(400).json({ status: false, message: "Invalid email address" })
        }
        
        let user = await userModel.findOne({ email: email})
        
        if(!user){
            return res.status(404).json({ status: false, message: "User not found" })
        }
        
        const hashedPassword = await bcrypt.compare(password, user.password);
        
        if(!hashedPassword) {
            return res.status(401).json({ status: false, message: "Incorrect password" })
        }

        let token = jwt.sign({
            userId : user._id.toString()
        },
        process.env.SECRET_KEY
        )
        res.setHeader('x-api-key', token)

        return res.status(200).json({status: true, token: token, message: "login successful"})
        
    }catch(error){
        return res.status(500).json({ status: false, message: error.message || error })
    }
    
}


module.exports = {signupUser, loginUser}