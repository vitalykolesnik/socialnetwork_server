const { Profile, Friendship } = require('../models/models.js');

class FriendService {
    async getFriends(id, page, count) {
        const friends = await Friendship.findAndCountAll({
            where: {
                appUserUserId: id,
            },
            offset: (page - 1) * count,
            limit: count,
            include: [{ model: Profile }],
        });
        return friends;
    }

    async subscribe(id, profileId) {
        if (id === profileId) {
            throw Error(`FrendId = userId subscribed`);
        }
        const candidate = await Friendship.findOne({
            where: {
                appUserUserId: id,
                profileId: profileId,
            },
        });

        if (candidate) {
            throw Error(`User with id:${profileId} is subscribed`);
        }

        const friend = await Friendship.create({
            appUserUserId: id,
            profileId: profileId,
        });
        return friend;
    }

    async unsubscribe(id, profileId) {
        const candidate = await Friendship.findOne({
            where: {
                appUserUserId: id,
                profileId: profileId,
            },
        });
        if (!candidate) {
            throw Error(`User with id:${profileId} is unsubscribed`);
        }
        const friend = await Friendship.destroy({
            where: {
                appUserUserId: id,
                profileId: profileId,
            },
        });
        if (!friend) {
            throw Error('incorrect friendId');
        }
        return friend;
    }
}

module.exports = new FriendService();
