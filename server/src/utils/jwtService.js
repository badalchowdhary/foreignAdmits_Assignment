const jwt = require("jsonwebtoken");

const createToken = (user) => {
    const accessToken = jwt.sign(
        {
           studentId: user._id,
           isAdmin: user.isAdmin
        },
        process.env.JWT_SECRETKEY,
        {expiresIn: "1d"}
    );
    return accessToken;
}

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRETKEY, (err,user) => {
            if(err) res.status(403).json("Token is not valid !");
            req.user = user;
            next();
        })
    } else{
        res.status(401).json("You are not authenticated");
    }
};

const verifyTokenAndAdmin = (req,res,next) => {
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next();
        } else {
            res.status(403).json("You are not authorized !");
        }
    });
};

module.exports = { createToken, verifyToken, verifyTokenAndAdmin };