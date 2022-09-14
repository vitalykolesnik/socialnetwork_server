const sequelize = require('../config/db_connect');
const { DataTypes } = require('sequelize');
const cryptPassword = require('../utils/crypt');

const User = sequelize.define(
    'app_user',
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [3, 30],
                    msg: 'login must contain 3-30 chars',
                },
            },
            unique: {
                args: true,
                msg: 'this login already exists',
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: 5,
                    msg: 'password must be bigger than 4 chars',
                },
            },
        },
    },
    { timestamps: false }
);

User.addHook('beforeCreate', async (user) => {
    user.password = await cryptPassword(user.password);
});

const Profile = sequelize.define('profile', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
            len: {
                args: [0, 100],
                msg: 'max length of status 100 symbols',
            },
        },
    },
});

Profile.hasOne(User);
User.belongsTo(Profile);

const Friendship = sequelize.define('friend', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasMany(Friendship);
Friendship.belongsTo(User);

Profile.hasMany(Friendship);
Friendship.belongsTo(Profile);

const Post = sequelize.define('post', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.STRING,
        defaultValue: '',
    },
});

Profile.hasMany(Post);
Post.belongsTo(Profile);

const Image = sequelize.define(
    'image',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        image: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
    },

    { timestamps: false }
);

Post.hasMany(Image);
Image.belongsTo(Post);

const Like = sequelize.define(
    'like',
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    },
    { timestamps: false }
);

Post.hasMany(Like);
Like.belongsTo(Post);
Like.belongsTo(Profile);

// const Dialog = sequelize.define('dialog', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     title: { type: DataTypes.STRING },
// });

// const UserDialog = sequelize.define('user_dialog', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

// const Message = sequelize.define('message', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     text: { type: DataTypes.STRING },
//     isRead: { type: DataTypes.BOOLEAN, defaultValue: false },
// });

// const Like = sequelize.define('like', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
// });

// User.hasMany(Friend);
// Friend.belongsTo(User);

// User.belongsToMany(Dialog, { through: UserDialog });
// Dialog.belongsToMany(User, { through: UserDialog });

// Dialog.hasMany(Message);
// Message.belongsTo(Dialog);

// User.hasMany(Message);
// Message.belongsTo(User);

// User.hasMany(Like);
// Like.belongsTo(User);

// Post.hasMany(Like);
// Like.belongsTo(Post);

module.exports = { User, Post, Profile, Friendship, Like, Image };
