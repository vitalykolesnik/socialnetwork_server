const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return res.redirect('/login');

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            res.redirect('/login');
        }
        next();
    });
};

module.exports = requireAuth;
