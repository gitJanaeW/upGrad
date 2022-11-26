const router = require("express").Router();
const sequelize = require("sequelize");
const { User, Project } = require("../models");
const authLogin = require("../utils/auth");

// display the login page
router.get("/login", (req, res) => {
  // if user is already logged in, redirect them to the homepage
  // if (req.session.loggedIn) {
  //     res.redirect('/');
  //     return;
  // }
  // render login.handlebars
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});

// homepage (prompt login & sign up)
router.get("/", (req, res) => {
  res.render("homepage");
});

// display a specific project on its own page
router.get("/project/:id", authLogin, (req, res) => {
  console.log("HERE I AM IN HOME");
  Project.findOne({
    include: [
      {
        model: User,
        attributes: ["name", "institution"],
      },
    ],
  })
    .then((projectData) => {
      if (!projectData) {
        res.status(404).json({ message: "No project found with this id" });
        return;
      }
      // this formats the data Sequelize gives us into a readable format
      const project = projectData.get({ plain: true });
      // use the data from the response to render project.handlebars
      res.render("project", { project });
    })
    .catch((err) => {
      console.log("ENTERING ERROR")
      console.log(err);
      res.status(500).json(err);
    });
});

//display all projects user has
router.get("/profile", authLogin, (req, res) => {
  Project.findAll({
    where: {
      user_id: req.session.user_id,
    },
    order: [["id", "ASC"]],
    include: [
      {
        model: User,
        attributes: ["name", "institution", "email"],
      },
    ],
  })
    .then((allUserProjects) => {
      // this is currently not going to be called because allUserProjects returns a '[]'
      if (!allUserProjects) {
        res.json({ message: "No results found for this search" });
      }
      // this formats the data Sequelize gives us in a readable format
      const userProjects = allUserProjects.map((project) =>
        project.get({ plain: true })
      );

      res.render("profile", { userProjects });
    })
    .catch((err) => {
      console.log("ENTERING ERROR");
      console.log(err);
      res.status(500).json(err);
    });
});



module.exports = router;