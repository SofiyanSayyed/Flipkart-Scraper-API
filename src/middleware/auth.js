import jwt from 'jsonwebtoken'
import userModel from '../models/userModel'
import dotenv from 'dotenv'
dotenv.config();
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
        return res.status(500).json({ status: false, message: err.message });
    }
};



// const authorisation = async function (req, res, next) {
//     try {
//         const bookId = req.params.bookId;

//         if (!validation.validObjectId(bookId)) {
//             return res.status(400).json({ status: false, message: "Enter valid book id" })
//         }

//         const uid = await bookModel.findOne({ isDeleted: false, _id: bookId }).select({ _id: 0, userId: 1 });

//         if (uid === null) {
//             return res.status(403).json({ status: false, message: "You are not authorised" })
//         }

//         const decId = req.decodedToken.userId;
//         if (decId == uid.userId) {
//             next()
//         }
//         else {
//             return res.status(403).json({ status: false, message: "You are not authorised" })
//         }


//     } catch (err) {
//         res.status(500).json({ status: false, message: err.message });
//     }
// };
// module.exports = { authentication, authorisation };