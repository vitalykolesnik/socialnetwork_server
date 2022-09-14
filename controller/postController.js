const postService = require('../service/postService');
const getIdFromJWT = require('../utils/decodeIdFromJWT');

class PostController {
    async getAllPosts(req, res) {
        const page = req.query.page || 1;
        const count = req.query.count || 50;

        const posts = await postService.getAllPosts(page, count);
        res.json({
            errorCode: 0,
            posts,
            totalCount: posts.length,
        });
    }

    async getPosts(req, res) {
        const profileId = req.params.profileId;
        try {
            const posts = await postService.getPosts(profileId);

            res.json({
                errorCode: 0,
                posts,
                totalCount: posts.length,
            });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    async createPost(req, res) {
        const { text } = req.body;
        const id = getIdFromJWT(req);

        try {
            const files = [...req.files];
            const post = await postService.createPost(id, text, files);
            res.status(201).json({ errorCode: 0, ...post });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    async likePost(req, res) {
        const postId = req.params.postId;
        const userId = getIdFromJWT(req);
        try {
            const like = await postService.likePost(postId, userId);
            res.status(201).json({ errorCode: 0, like: !!like });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    async deletePost(req, res) {
        const id = getIdFromJWT(req);
        const postId = req.params.postId;
        try {
            const post = await postService.getOnePost(postId);
            if (id !== post.profileId)
                return res
                    .status(403)
                    .json({ errorCode: 1, errors: 'forbidden' });
            const result = await postService.deletePost(postId);
            res.status(200).json({ errorCode: !result ? 1 : 0 });
        } catch (err) {
            res.status(200).json({ errorCode: 1, err });
        }
    }

    errorRoute(req, res) {
        res.json({ error: 'Not found' });
    }
}

module.exports = new PostController();
