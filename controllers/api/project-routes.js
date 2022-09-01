const router = require('express').Router();
const {User, Project} = require('../../model');
const authLogin = require('../../utils/auth');

// get all projects (shown from newest to oldest)
router.get('/', (req, res) => {
    Project.findAll({
        attributes: {
            include: [['created_at']]
        },
        // newest posts will show first based on id number
        order: [['id', 'ASC']]
    })
    .then(allProjects => res.json(allProjects))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get a single project
router.get('/:id', (req, res) => {
    Project.findOne({
        attributes: {
            include: [['created_at']]
        },
        where: {
            id: req.params.id
        }
    })
    .then(projectData => res.json(projectData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a project
router.post('/', authLogin, (req, res) => {
    Project.create({
        // these are all the data we'll need from input fields on frontend when the req is made
        user_id: req.session.user_id,
        title: req.body.title,
        abstract: req.body.abstract,
        drive_url: req.body.drive_url,
        discipline: req.body.discipline,
        subject: req.body.subject,
        collab_status: req.body.collab_status,
        finished: req.body.finished
    })
    .then(newProjectData => res.json(newProjectData))
    .catch(err => {
        console.log(err);
        res.status.apply(500).json(err);
    });
});

// update a project
router.put('/:id', authLogin, (req, res) => {
    Project.update({
        title: req.body.title,
        abstract: req.body.abstract,
        drive_url: req.body.drive_url,
        collab_status: req.body.collab_status
    })
    .then(changedProject => {
        if (!changedProject) {
            res.status(404).json({message: 'No project found matching this id'});
            return;
        }
        res.json(changedProject);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// delete a project
router.put('/:id', authLogin, (req, res) => {
    Project.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(deleteResults => {
        if (!deleteResults) {
            res.status(404).json({message: 'No project found matching this id'});
            return;
        }
        res.json(deleteResults);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;