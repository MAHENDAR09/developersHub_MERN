const jwt = require('jsonwebtoken');


module.exports = function  (req,res,next) {
    try{
        let token = req.header('x-token');
        if(!token) return res.status(401).send('Access denied. No token provided.');

        let decoded = jwt.verify(token,'jwtpassword');
        req.user = decoded.user;
        next();
    }
    catch(err){
        console.log(err);
        res.status(401).send({message: 'Authentication err'})
    }
}