const consumers = require('../models/data');

const getUsers = (req, res) => {
    console.log('Send users, ' + new Date().toString());
    const page = req.query.page || 1;
    const count = req.query.count || 10;
    const totalCount = consumers.length;
    let start = (page - 1) * count;
    let end = page * count;
    // console.log(
    //     `page: ${page} count: ${count} start: ${start} end: ${end} totalCount: ${totalCount}`
    // );
    res.json({
        errorCode: 0,
        users: consumers.slice(start, end),
        totalCount: totalCount,
    });
};

const getUser = (req, res) => {
    const id = req.params.id - 1;
    res.json({
        errorCode: 0,
        profile: { ...consumers[id] },
    });
};

const errorRoute = (req, res) => {
    res.json({ errorCode: 1 });
};

module.exports = { getUser, getUsers, errorRoute };
