const sequelize = require('sequelize');
const { Profile } = require('../models/models.js');

class ProfileService {
    async createProfile(user) {
        const newProfile = await Profile.create({
            id: user.userId,
            name: user.login,
        });
        return newProfile;
    }

    async getAllUsers(page, total) {
        const users = await Profile.findAndCountAll({
            offset: (page - 1) * total,
            limit: total || 0,
        });
        return users;
    }

    async getProfileById(id) {
        const profile = await Profile.findOne({
            where: { id: id },
        });
        return profile;
    }

    async getProfileStatus(id) {
        const profile = await Profile.findOne({
            where: { id: id },
        });
        return profile.status;
    }

    async updateProfileStatus(id, status) {
        const profile = await Profile.findOne({
            where: { id: id },
        });
        if (!profile) {
            throw Error('incorrect user');
        }
        profile.status = status;
        profile.save();
        return profile.status;
    }

    async updatePhoto(id, filePath) {
        const profile = await Profile.findOne({
            where: { id: id },
        });
        if (!profile) {
            throw Error('incorrect user');
        }
        profile.image = filePath;
        profile.save();
        return profile.image;
    }
}

module.exports = new ProfileService();
