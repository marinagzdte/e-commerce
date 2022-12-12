import passport from '../middlewares/passport.js';
import { Router } from 'express';
import logger from '../utils/logger.js';
import { getLogout, getLoginError, getRegisterError, postLogin, postRegister } from '../controllers/UsersController.js'

const userRouter = new Router();

userRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login/error' }), postLogin);

userRouter.get('/logout', logger.logReqInfo, getLogout)

userRouter.get('/login/error', logger.logReqInfo, getLoginError)

userRouter.post(
    '/register',
    passport.authenticate('register', { failureRedirect: '/register/error' }),
    postRegister);

userRouter.get('/register/error', logger.logReqInfo, getRegisterError)

export default userRouter;