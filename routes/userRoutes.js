const { Router } = require("express")
const router = Router();

const authenticate = require('../middlewares/authenticate');

const { userRegister, userLogin, userLogout } = require("../controllers/userController");

router.post('/user/register', userRegister );

router.post('/user/login', userLogin);

router.delete('/user/logout/:token', authenticate, userLogout);

module.exports = router