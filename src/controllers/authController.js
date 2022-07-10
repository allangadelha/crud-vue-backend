const { hash, compare } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const SECRET = process.env.SECRET;
const AUTH_TIME = process.env.AUTH_TIME
class AuthController {

    generateToken(params = {}) {
        return jwt.sign(params, SECRET, {
            expiresIn: AUTH_TIME
        });
    }
    
    
    async auth(res, data) {
        const { email, password } = data;
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            res.status(401).json({
                status: 401,
                message: "Usuário não encontrado."
            });
            return false;
        }

        const passwordValid = await compare(password, user.password);

        if (!passwordValid) {
            res.status(401).json({
                status: 401,
                error: "Usuário não encontrado"
            });
            return false;
        }

        User.findOne({
            email: email
        }, (err, user) => {
            if (err) throw err;
            if (!user || user === null) {
                res.status(404).json({
                    status: 404,
                    message: "Usuário não encontrado."
                });
                return false;
            }

            return res.json({
                status: 200,
                message: "Usuário encontrado com sucesso.",
                user,
                expiration: `${AUTH_TIME} secunds.`,
                token: this.generateToken({ id: user.id })
            });
        });

    };

    async register(res, data) {
        const { name, email, password } = data;
        const findUser = await User.findOne({ email });
        if (findUser) {
            res.status(404).json({
                status: 404,
                message: "Usuário já cadastrado."
            });
            return false;
        }
        const hash_password = await hash(password, 10);
        data.password = hash_password;

        User.create(data, (err, newUser) => {
            if (err) throw err;
            if (!newUser || newUser === null) {
                return res.staus(404).json({
                    status: 404,
                    message: "Não foi possível cadastrar usuário."
                });
            }
            return res.json({
                status: 200,
                message: "Usuário cadastrado com sucesso.",
                user: newUser,
                token: this.generateToken({ id: newUser.id })
            });
        });
    };
};

exports.authController = new AuthController();
