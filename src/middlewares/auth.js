import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

const isAdmin = (user) => {
    if (user.email === process.env.ADMIN_EMAIL)
        return true

    return false
}

const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else
        res.status(403)
           .json({ error: 0, mensaje: "debe autenticarse para acceder a este recurso"});
}

const checkAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.email === process.env.ADMIN_EMAIL) {
            next();
        }
        else
            res.status(401)
               .json({ error: 0, mensaje: "no esta autorizado a acceder a este recurso"});
    } else
        res.status(403)
           .json({ error: 0, mensaje: "debe autenticarse para acceder a este recurso"});
};

export {checkAdmin, checkAuth, isAdmin};