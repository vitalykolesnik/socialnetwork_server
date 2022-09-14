const jwt = require('jsonwebtoken');
const authService = require('../service/authService');
const profileService = require('../service/profileService');
const handleSubmitError = require('../error/authErrorHandler');

const MAX_AGE = 3 * 24 * 60 * 60;

class AuthController {
    async logout(req, res) {
        try {
            res.cookie('jwt', '', { maxAge: 1 });
            res.status(200).json({ errorCode: 0 });
        } catch (err) {
            const errors = handleSubmitError(err);
            res.status(200).json({ errorCode: 1, errors });
        }
    }

    async signup(req, res) {
        const { login, password } = req.body;
        try {
            const user = await authService.signup({
                login: login,
                password: password,
            });
            const profile = await profileService.createProfile(user);
            user.profileId = profile.id;
            user.save();
            const token = createToken(user.userId, user.profileId, login);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: MAX_AGE * 1000,
            });

            res.status(201).json({ errorCode: 0, jwt: token });
        } catch (err) {
            const errors = handleSubmitError(err);
            res.status(200).json({ errorCode: 1, errors });
        }
    }

    async login(req, res) {
        const { login, password } = req.body;
        try {
            const user = await authService.login(login, password);

            const token = createToken(user.userId, user.profileId, login);
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: MAX_AGE * 1000,
            });
            res.status(200).json({ errorCode: 0, jwt: token });
        } catch (err) {
            const errors = handleSubmitError(err);
            res.status(200).json({ errorCode: 1, errors });
        }
    }

    async getAll(req, res) {
        const result = await authService.getAll();
        res.json(result);
    }
}

const createToken = (id, profileId, login) => {
    return jwt.sign({ id, profileId, login }, process.env.TOKEN_SECRET, {
        expiresIn: MAX_AGE,
    });
};

module.exports = new AuthController();
