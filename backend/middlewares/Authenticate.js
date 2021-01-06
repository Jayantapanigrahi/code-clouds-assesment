var jwt = require('jsonwebtoken');
const { ObjectID } = require('mongodb');
const jwtConfig = require('../config/jwt.config');
const secret = jwtConfig.secret
class Authentication {

    async jwtVerification(req, res, next) {
        var token = req.headers.authorization


        var verifyOptions = {
            expiresIn: "1d",
            algorithm: "HS256"
        };
        if (token == undefined) {
            res.status(500)
            return Promise.reject(res.json({ errKey: "JwtExpire" }))
        }
        await jwt.verify(token, secret, verifyOptions, async function (err, decoded) {
            if (err) {
                res.status(500)
                return Promise.reject(res.json({ errKey: "JwtExpire" }))
            }
            else {
                req.headers['unique_id'] = new ObjectID(decoded.mongoId)
                req.headers['type'] = decoded.type;
                next()
            }
        });
    }



    async jwtCreation(data) {
        var payLoad = {
            mongoId: data._id,
            type: data.type
        }
        var signOptions = {
            // issuer:  i,
            // subject: header['user-agent'],
            // user_agent:header['user-agent'],

            expiresIn: "1d",
            algorithm: "HS256"
        };
        return (jwt.sign(payLoad, secret, signOptions))
    }

}

module.exports = {
    authentication: new Authentication()
}