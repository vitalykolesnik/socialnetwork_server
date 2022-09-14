const { Post, Profile, Like, Image } = require('../models/models.js');

class PostService {
    getAllPosts = async (page, count) => {
        const posts = await Post.findAll({
            offset: (page - 1) * count,
            limit: count,
            order: ['createdAt'],
            include: [Profile, Like, Image],
        });
        return posts;
    };

    getOnePost = async (postId) => {
        const post = await Post.findOne({
            where: {
                id: postId,
            },
            include: [Like, Image],
        });
        return post;
    };

    getPosts = async (id) => {
        const posts = await Post.findAll({
            where: {
                profileId: id,
            },
            order: ['createdAt'],
            include: [Like, Image],
        });
        return posts;
    };

    deletePost = async (postId) => {
        const posts = await Post.destroy({
            where: {
                id: postId,
            },
        });
        if (posts) {
            await Like.destroy({
                where: {
                    postId: null,
                },
            });
            await Image.destroy({
                where: {
                    postId: null,
                },
            });
        }
        return posts;
    };

    createPost = async (id, text, images) => {
        const post = await Post.create({
            profileId: id,
            text: text,
        });
        if (images.length && post) {
            const list = [];
            for (const image of images) {
                const imagePath = `${process.env.HOST_URL}/${image.filename}`;
                const img = await Image.create({
                    postId: post.id,
                    image: imagePath,
                });
                list.push(img);
            }
            post.image = list;
        }
        return post;
    };

    likePost = async (postId, profileId) => {
        const like = await Like.destroy({
            where: {
                postId: postId,
                profileId: profileId,
            },
        });

        if (!like) {
            return await Like.create({
                postId,
                profileId,
            });
        }
    };
}

module.exports = new PostService();
