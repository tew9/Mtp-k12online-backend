const express = require('express');
const { signup, signin, signout } = require('../../controllers/auth')
const { isRequestValidatedSignup, validateRequestSignup, 
        validateRequestSignin, isRequestValidatedSignin } = require('../../validators/auth');
const router = express.Router();

router.post('/signin',validateRequestSignin, isRequestValidatedSignin, signin);
router.post('/signup', validateRequestSignup, isRequestValidatedSignup, signup);
router.post('/signout', signout);

module.exports = router;