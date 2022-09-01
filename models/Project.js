const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Project extends Model { }

// set up fields and rules for Project model
Project.init(
    {
        // define columns
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        project_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        abstract: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        collab_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        project_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isUrl: true,
            },
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ongoing_status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'project',
    }
);

module.exports = Project;


