const bcrypt = require('bcrypt');

const cryptPassword = async (inputPassword) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(inputPassword, salt);
};

module.exports = cryptPassword;
