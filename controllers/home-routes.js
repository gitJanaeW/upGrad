const router = require('express').Router();
const sequelize = require('sequelize');
const {User, Project} = require('../models');

// display a list of projects on homepage
router.get('/', (req, res) => {
    Project.findAll({
        include: [
            {
                model: User,
                attributes: ['name', 'institution']
            }
        ]
    })
    .then(allProjects => {
        // this formats the data Sequelize gives us in a readable format
        const projects = allProjects.map(project => project.get({plain: true}));
        // use the data from the response + loggedIn status to render homepage.handlebars
        res.render('homepage', {
            projects,
            // loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// display a specific project on its own page
router.get('project/:id', (req, res) => {
    Project.findOne({
        include: [
            {
                model: User,
                attributes: ['name', 'institution']
            }
        ]
    })
    .then(projectData => {
        if(!projectData) {
            res.status(404).json({message: 'No project found with this id'});
            return;
        }
        // this formats the data Sequelize gives us in a readable format
        const project = projectData.get({plain: true});
        // use the data from the response to render project-view.handlebars
        res.render('project-view', {project});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// display the login page
router.get('/login', (req, res) => {
    // if user is already logged in, redirect them to the homepage
    // if (req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }
    // render login.handlebars
    res.render('login');
});

module.exports = router;