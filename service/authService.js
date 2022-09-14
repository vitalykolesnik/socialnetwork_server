const bcrypt = require('bcrypt');
const { User } = require('../models/models.js');

class AuthService {
    async login(login, password) {
        const user = await User.findOne({
            where: { login: login },
        });
        if (!user) {
            throw Error('login not found');
        }
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {
            throw Error('incorrect login or password');
        }
        return user;
    }

    async signup(user) {
        const { login, password } = user;
        const authUser = await User.findOne({
            where: { login: login },
        });

        if (authUser) {
            throw Error('login already created');
        }
        const candidate = await User.create({
            login,
            password,
        });
        return candidate;
    }

    async getAll() {
        const users = await User.findAll();
        return users;
    }
}

module.exports = new AuthService();
