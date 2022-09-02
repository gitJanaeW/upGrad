const router = require('express').Router();
const sequelize = require('sequelize');
const {User, Project} = require('../models');
const authLogin = require('../utils/auth');

// display dashboard
router.get('/', (req, res) => {
    // get logged in User's info
    User.findOne({
        where: {
            id: req.session.id
        },
        // include the Projects related to this User
        include: [
            {
                model: Project,
                attributes: [
                    'id',
                    'project_name',
                    'abstract',
                    'collab_status',
                    'project_url',
                    'subject',
                    'ongoing_status'
                ]
            }
        ]
    })
    .then(userProfile => {
        // Not sure what format this data is returned in. Logging to see result
        // If result isn't proper format, we'll need to reformat if with userProfile.projects.get({plain: true})
        console.log(userProfile);
        // use the data from the response + loggedIn status to render dashboard.handlebars
        res.render('dashboard', {
            userProfile,
            // loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', (req, res) => {
    // get a project (based on project id)
    Project.findOne({
        where: {
            id: req.params.id
        },
        // include the user's name
        include: [
            {
                model: User,
                attributes: ['name']
            }
        ]
    }).
    then(projectData => {
        if (!projectData) {
            res.status(404).end();
            return;
        }
        const project = projectData.get({plain: true});
        // use the data from the response + loggedIn status to render edit-project.handlebars
        res.render('edit-project', {
            project,
            // loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
