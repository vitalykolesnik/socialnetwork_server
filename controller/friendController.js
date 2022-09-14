const friendService = require('../service/friendService');
const getIdFromJWT = require('../utils/decodeIdFromJWT');

class FriendController {
    async getFriends(req, res) {
        const page = req.query.page || 1;
        const count = req.query.count || 10;
        const id = getIdFromJWT(req);

        const friends = await friendService.getFriends(id, page, count);
        res.status(200).json({
            errorCode: 0,
            friends: friends.rows,
            totalCount: friends.count,
        });
    }

    async subscribe(req, res) {
        const id = getIdFromJWT(req);
        const { profileId } = req.body;
        try {
            const friend = await friendService.subscribe(id, profileId);
            res.status(201).json({ errorCode: 0, ...friend });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    async unsubscribe(req, res) {
        const id = getIdFromJWT(req);
        const { profileId } = req.body;
        try {
            const result = await friendService.unsubscribe(id, profileId);
            res.status(200).json({ errorCode: result ? 0 : 1 });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    errorRoute(req, res) {
        res.json({ error: 'Not found' });
    }
}

module.exports = new FriendController();
