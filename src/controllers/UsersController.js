import logger from '../utils/logger.js';
import { sendNewUserEmail } from '../utils/emailUtils.js';

const postLogin = (req, res) => {
    res.status(200)
       .json({ username: req.user.email, cart: req.user.cart })
}

const getLogout = (req, res) => {
    req.logout({ keepSessionInfo: false }, (err) => res.status(200).send())
}

const getLoginError = (req, res) => {
    res.status(403)
       .json({ error: -11, descripcion: 'no se pudo iniciar sesion' })
}

const postRegister = async (req, res) => {
    await sendNewUserEmail(req.user)
    res.status(200)
       .json({ username: req.user.email, cart: req.user.cart})
}

const getRegisterError = (req, res) => {
    res.status(500)
       .json({ error: -11, descripcion: 'no se pudo registrar el usuario' })
}

export { getLogout, getLoginError, getRegisterError, postLogin, postRegister }