const userSeeds = require('./user-seeds');
const postseeds = require('./post-seeds');

const sequelize = require('..config/connection');

const seedDb = async () => {
    await sequelize.sync({force:true});
    await userSeeds();
    await postseeds();
    process.exit(0);
};

seedDb();