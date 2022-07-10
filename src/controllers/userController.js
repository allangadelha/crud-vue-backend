const { hash } = require('bcryptjs');
const User = require('../models/User');

class UserController {
    getAllUser(res) {
        User.find({
        }, (err, users) => {
            if (err) throw err;
            if (!users || users === null) {
                return res.status(404).json({
                    status: 404,
                    message: "Nenhum usuário encontrado."
                });
            }
            return res.json({
                status: 200,
                message: "Usuários encontrados com sucesso.",
                total: users.length,
                users
            });
        });
    };

    getUser(res, id) {
        User.findOne({
            _id: id
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
                user
            });
        });
    };

    async addUser(res, data) {
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
                user: newUser
            });
        });
    };

    async updateUser(res, id, data) {
        const findUser = await User.findById(id);
        if (!findUser || findUser === null) {
            res.status(404).json({
                status: 404,
                message: "Usuário não encontrado."
            });
            return false;
        }

        User.updateOne({
            _id: id
        }, data, (err, updateUser) => {
            if (err) throw err;
            if (!updateUser || updateUser === null) {
                return res.status(404).json({
                    status: 404,
                    message: "Não foi possível atualizar usuário."
                });
            }
            return res.json({
                status: 200,
                message: "Usuário atualizado com sucesso.",
                user: updateUser
            });
        });
    };

    async deleteUser(res, id) {
        const deleteUser = await User.findById(id);
        if (!deleteUser || deleteUser === null) {
            res.status(404).json({
                status: 404,
                message: "Usuário não encontrado."
            });
            return false;
        }

        User.deleteOne({
            _id: id
        }, (err) => {
            if (err) throw err;
            return res.json({
                status: 200,
                message: "Usuário deletado com sucesso."
            });
        });
    };
};

exports.userController = new UserController();