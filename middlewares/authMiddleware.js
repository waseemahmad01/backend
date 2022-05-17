const jwt = require("jsonwebtoken");
module.exports.auth = (req,res,next)=>{
    const bearerHeader = req.headers['authorization'];
    if(bearerHeader){
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, process.env.PUBLICK_KEY, (err,decoded)=>{
            if(err){
                return res.status(400).json({
                    status: "fail",
                    message: "you are not authorized to access this resource",
                })
            }else{
            req.id = decoded.id;
                next();
            }
        });
    }else{
        res.send('error')
    }
    
}