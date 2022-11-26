const { User } = require('../models');
const sequelize = require('../config/connections');

const userdata = [
    {
        name: 'Spencer P.',
        email: 'email@email.com',
        institution: 'Concordia University',
        id: 1
    },
    {
        name: 'Janae W',
        email: 'something@email.com',
        institution: 'Ryerson University',
        id: 2
    },
    {
        name: 'Sonja I',
        email: 'sonja@email.com',
        institution: 'Carleton University',
        id: 3
    },
    {
        name: 'John S',
        email: 'john@email.com',
        institution: 'University of Toronto',
        id: 4
    },
    {
        name: 'Jane D',
        email: 'jane@email.com',
        institution: 'University of Ottawa',
        id: 5
    },
]

const seedPosts = () => User.bulkCreate(userdata);

module.exports = seedPosts;
