const profileService = require('../service/profileService');
const getIdFromJWT = require('../utils/decodeIdFromJWT');

class ProfileController {
    async getMe(req, res) {
        try {
            const id = getIdFromJWT(req);
            if (!id)
                res.status(403).json({ errorCode: 1, errors: 'jwt not valid' });
            const profile = await profileService.getProfileById(id);
            if (!profile)
                res.status(403).json({ errorCode: 1, errors: 'unautorized' });
            res.status(200).json({ errorCode: 0, ...profile });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    async getUsers(req, res) {
        const page = req.query.page || 1;
        const total = req.query.count || 10;

        const users = await profileService.getAllUsers(page, total);
        res.status(200).json({
            errorCode: 0,
            users: users.rows,
            totalCount: users.count,
        });
    }

    async getProfile(req, res) {
        const id = req.params.id;
        try {
            const profile = await profileService.getProfileById(id);
            res.json({
                errorCode: 0,
                profile,
            });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    async getProfileStatus(req, res) {
        const id = req.params.id;
        try {
            const status = await profileService.getProfileStatus(id);
            res.json({
                errorCode: 0,
                status,
            });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    async updateProfileStatus(req, res) {
        const id = getIdFromJWT(req);
        const text = req.body.status;
        try {
            const status = await profileService.updateProfileStatus(id, text);
            res.json({
                errorCode: 0,
                status,
            });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    async updatePhoto(req, res) {
        const id = getIdFromJWT(req);

        try {
            const { filename } = req.file;
            const resultPath = `${process.env.HOST_URL}/${filename}`;

            const image = await profileService.updatePhoto(id, resultPath);
            res.status(201).json({
                errorCode: 0,
                image,
            });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    async errorRoute(req, res) {}
}
module.exports = new ProfileController();
