const jwt=require('jsonwebtoken');

function generateToken(user){
    //jwt.sign(userObj,jwt_secret,expires)
    return jwt.sign(
        {userId:user.id
        ,email:user.email
        ,username:user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn:'1h'
        });
}
module.exports={generateToken};