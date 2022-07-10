const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            status: 401,
            message: "Token não foi informado."
        });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).json({
            status: 401,
            message: "Token inválido."
        });
    }

    const [scheme, token] = parts;

    if(!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({
            status: 401,
            message: "Token mal formatado."
        });
    }

    jwt.verify(token, SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                status: 401,
                message: "Token inválido."
            });
        }

        req.userId = decoded.id;

        return next();
    });
}