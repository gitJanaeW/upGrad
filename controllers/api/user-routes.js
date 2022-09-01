const router = require('express').Router();
const sequelize = require('sequelize'); // in case of a sequelize.literal
const {User, Project} = require('../../models');
const authLogin = require('../../utils/auth');

const startNewSession = (data) => {
    // check if user is already logged in (just in case)
    if (req.session.loggedIn) {
        res.status(500).json({message: `${req.session.name} is already logged in`});
        return;
    }
    // else, start new session
    req.session.save((data) => {
        // start a new session with user credentials (user_id & name)
        req.session.user_id = newUserData.id;
        req.session.name = newUserData.name;
        req.session.loggedIn = true;
        res.json({user: data, message: `${req.session.name} has logged in`});
    });
};

// find all users
router.get('/', (req, res) => {
    User.findAll({
        // respond with all attributes of user except password
        attributes: {
            // remove password attribute from the response
            exclude: ['password'],
            // add attribute ('project_count') to the response that keeps track of a user's number of Projects
            include: [
                [
                    sequelize.literal('(SELECT COUNT(*) FROM project WHERE user.id = project.user_id)'),
                    'project_count'
                ]
            ]
        },
        // also include a list of user projects
        include: [
            {
                model: Project,
                // Trying something new: Sequelize documentation says you don't need to include attributes list
                // attributes: [
                //     'id',
                //     'user_id',
                //     'title',
                //     'abstract',
                //     'collab_status',
                //     'drive_url',
                //     'discipline',
                //     'subject',
                //     'created_at'
                // ]
            }
        ]
    })
    // respond with all users
    .then(allUsers => res.json(allUsers))
    // display/respond with an error, if any
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// find a single user
router.get('/:id', (req, res) => {
    User.findOne({
        // respond with all attributes of user except password
        attributes: {
            // remove password attribute from the response
            exclude: ['password'],
            // add attribute ('project_count') to the response that keeps track of a user's number of Projects
            include: [
                [
                    sequelize.literal('(SELECT COUNT(*) FROM project WHERE user.id = project.user_id)'),
                    'project_count'
                ]
            ]
        },
        // only respond with user who matched params id
        where: {
            id: req.params.id
        },
        // also include a list of user projects
        include: [
            {
                model: Project,
                // Trying something new: Sequelize documentation says you don't need to include attributes list
                // attributes: [
                //     'id',
                //     'user_id',
                //     'title',
                //     'abstract',
                //     'collab_status',
                //     'drive_url',
                //     'discipline',
                //     'subject',
                //     'created_at'
                // ]
            }
        ]
    })
    // respond with user's data as specified above
    .then(userData => res.json(userData))
    // display/respond with an error, if any
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a user (sign up)
router.post('/', (req, res) => {
    // expected req.body:
    // {name: 'Example Name', email: 'exname@gmail.com', password: 'exPassword', institution: 'Ex University'}
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        institution: req.body.institution
    })
    .then(newUserData => startNewSession(newUserData))
});

// enter your credentials (login)
router.post('/login', authLogin, (req, res) => {
    // expected req.body:
    // {email: 'exname@gmail.com', password: 'exPassword'}
    User.findOne({
        // find a matching email in MySQL db
        where: {
            email: req.body.email
        }
    })
    .then(userCred => {
        // if no db email matches email in the request, return status 404
        if (!userCred) {
            res.status(404).json({message: 'No user found with this email'});
            // could add frontend or utils function to notify user on webpage that their "email or password is incorrect"
            return;
        }
        // if password is invalid, return status 400
        const validPassword = userCred.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({message: 'Password is incorrect'});
            return;
        }
        // else, start new session
        startNewSession();
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// logout
router.post('/logout', (req, res) => {
    if (!req.session.loggedIn) {
        res.status(404).end();
        return;
    };
    req.session.destroy(() => {
        req.status(204).end();
    });
});

// change name/password (past MVP)
router.put('/:id', authLogin, (req, res) => {
    // expected req.body:
    // {name: 'Example Name', password: 'exPassword'}
    User.update(req.body, {
        // indiviualHooks: true, (not sure this is necessary. look into if later if we use this)
        where: {
            id: req.params.id
        }
    })
    .then(changedUser => {
        // if no db user_id matches the params id in the request, return status 404
        if (!changedUser) {
            res.status(404).json({message: 'No user matching this id found'});
            return;
        }
        res.json(changedUser);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete account (past MVP?)
router.get('/:id', authLogin, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(deleteResults => {
        if (!deleteResults) {
            res.status(404).json({message: 'No user found matching this id.'});
            return;
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;