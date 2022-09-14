const { User } = require('../models/models.js');

class UserService {
    async getAllUsers() {
        const users = await User.findAll();
        return users;
    }
}

module.exports = new UserService();
