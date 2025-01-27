import express from 'express';
import { login, logout, signup, updateProfile, checkAuth } from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js"
const router = express.Router();


router.post('/signup', signup)

router.post('/login', login)

router.post('/logout', logout)

//we are using put method because profile gonna update every time
router.put('/update-profile',protectRoute, updateProfile)
//check logged in /authunticated before updating profile by using protectRouter
//if they are authenticated then we can call updateprofile function
//protectRoute is middleware


//if page get refresh  then check is user is authicated or not depending on that getting to the login page or profile page
router.get('/check' , protectRoute, checkAuth);



export default router;