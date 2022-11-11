const express = require('express');
const Admin = require('../models/Admin');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let authuser = require('../middleware/authuser.js');

const router = express.Router();
const JWT_SECRET = "MSRBUttamSahilIndiaPrivateLimitedAssessment";

// ROUTE 1: Create a User using: POST "/api/userAuth/createuser". No login required
router.post('/createuser', [
    body('username', 'Please Enter a valid UserName').isLength({min: 3}),
    body('password', 'Password must have atleast 5 Characters').isLength({min: 5})
], async (req, res) => {
    //if there are any errors in feild values then it show errors
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    try {
        //check whether the user already exists with this email
        let admin = await Admin.findOne({username: req.body.username});
        if(admin) {
            success = false;
            return res.status(400).json({ error: "Sorry a user with this username already exsits. Please use another username"});
        }
        const salt = await bcrypt.genSalt(10);
        const secretPass =  await bcrypt.hash(req.body.password, salt);

        //Create a New User
        admin = await Admin.create({
            username: req.body.username,
            password: secretPass
        });
        const data = {
            user: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


// ROUTE 2: Authenticate a User using: POST "/api/userAuth/login". No login required
router.post('/login', [
    body('username', 'Please enter a valid Username').exists(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {username, password} = req.body;
    try {
        //check whether the user exists with this email or not.
        let admin = await Admin.findOne({username});
        if(!admin) {
            success = false;
            return res.status(400).json({error: "Please try to login with correct credentials"});
        }
        
        //check wether the entered password is correct or not.
        const pass = await bcrypt.compare(password, admin.password);
        if(!pass) {
            success = false;
            return res.status(400).json({success, error: "Please try to login with correct credentials"});
        }
        const data = {
            user: {
                id: admin.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router;