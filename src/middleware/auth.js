const jwt = require('jsonwebtoken')
require('dotenv').config()
const { SECRET_KEY } = process.env



const authentication = async function (req, res, next) {
    try {
        let token = req.headers[ "x-api-key" ];
        if (!token) {
            res.status(401).json({ status: false, message: "Please login First." });
        } else {
            const decodedToken = jwt.verify(
                token,
                SECRET_KEY,
            );
            if (!decodedToken) {
                res.status(401).json({ status: false, message: "Authentication failed." });
            }

            req.decodedToken = decodedToken;
            next();

        }
    } catch (err) {
        return res.status(500).json({ status: false, message: err.message || err });
    }
};



module.exports = { authentication };