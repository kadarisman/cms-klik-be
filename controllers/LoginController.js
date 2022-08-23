const user = require('./../models/UserModel');
const bcrypt = require('bcrypt');
const jwt    = require('jsonwebtoken');

const login =  async (req, res) => {
    try {
        const {email, password} = req.body;
        const userByEmail = await user.getuserByEmail(email);
        const validPassword = await bcrypt.compare(password, userByEmail.passwordHash);
        const userLogin = await user.loginCheck(email, validPassword);
        if(!userLogin){
            res.json({error : 'Wrong Usename or Password!'});
            return false;            
        }
        const token = jwt.sign({
            email : userLogin.email,
            fullName : userLogin.fullName, 
            role : userLogin.role
        },process.env.SECRET);

        res.status(201).json({token : token});
        var decode = jwt.verify(token, process.env.SECRET);
        req.auth = decode;
    } catch (error) {
        res.status(401).json({error : error});
    }   
}

module.exports = {
    login
}