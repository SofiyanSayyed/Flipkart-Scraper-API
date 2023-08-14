import express from 'express';
const router = express.Router()
import {signupUser, loginUser} from '../controller/userController'


router.post('/signup', signupUser)
router.post('/login', loginUser)



router.all('/*', (req, res) => {
    return res.status(404).json({ status: false, message: "Invalid request" })
})

export default router;