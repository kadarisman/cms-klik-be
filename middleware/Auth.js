const jwt    = require('jsonwebtoken');

const isAuth = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token     = authHeader && authHeader.split(' ')[1];
        if(token == null ){
            res.status(401).json({
                message: 'Token is Invalid'
            });
        }
        var decode = jwt.verify(token, process.env.SECRET);
        req.auth = decode; 
          next();
    } catch (error) {
        res.status(401).json({
        message: 'Token is Invalid'
        });       
    }
}

const isSuperAdmin = (req, res, next) => {
    try {
        const autHeader = req.headers['authorization'];
        const token     = autHeader && autHeader.split(' ')[1];
        if(token == null ){
            res.status(401).json({
                message: 'Token is Invalid'
            });
        }
        var decode = jwt.verify(token, process.env.SECRET);
        req.auth = decode;
        if(req.auth.role != "superadmin"){
            res.status(401).json({error : 'Tidak punya akses'});
            return false;
        }    
        next();
    } catch (error) {
        res.status(401).json({
        message: 'Token is Invalid'
        });       
    }
}


module.exports = {
    isAuth,
    isSuperAdmin
}