const jwt = require('jsonwebtoken');

const getIdFromJWT = (req) => {
    const token = req.cookies.jwt;
    const { payload } = jwt.decode(token, { complete: true });
    return payload.profileId;
};

module.exports = getIdFromJWT;
