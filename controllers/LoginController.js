//const user = require('./../models/UserModel');
const jwt    = require('jsonwebtoken');

const login =  async (req, res) => {
    try {
        const user_login = await user.Login_check(req.body.username, req.body.password);
        if(!user_login){
            res.json({error : 'Wrong Password!'});
            return false;            
        }
        const token = jwt.sign({id_user : user_login.id_user, username : user_login.username, role : user_login.role}, process.env.SECRET);
        res.json({token : token});
        var decode = jwt.verify(token, process.env.SECRET);
        req.auth = decode;
    } catch (error) {
        res.status(401).json({error : error});
    }   
}

module.exports = {
    login
}