'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
    admin = require('../../app/controllers/admin'),
    instr = require('../../app/controllers/instructor');

module.exports = function(app) {
    // Instructor Routes
    app.route('/instr')
        .get(users.requiresLogin, instr.checkRights, admin.listTrainees);

    app.route('/instr/fellows')
        .get(users.requiresLogin, instr.checkRights, admin.listFellows);

    app.route('/instr/bootcamps')
        .get(users.requiresLogin, instr.checkRights, admin.bootCamps);

    app.route('/instr/skill')
        .post(users.requiresLogin, instr.checkRights, instr.addSkills);

    app.route('/instr/skill/:userId/:skillId')
        .put(users.requiresLogin, instr.checkRights, instr.editRating)
        .delete(users.requiresLogin,  instr.deleteRating);

    app.route('/instr/camp/:campId')
        .get(users.requiresLogin, instr.checkRights, admin.read);

    app.route('/instr/trainee/:traineeId')
        .get(users.requiresLogin, instr.checkRights, instr.readTrainee)
        .put(users.requiresLogin, instr.checkRights, instr.selectFellow)
        .post(users.requiresLogin, instr.checkRights, instr.createAssmt);

    app.route('/instr/trainee/:traineeId/:assmtId')
        .put(users.requiresLogin, instr.checkRights, instr.isCreator, instr.updateAssmt)
        .delete(users.requiresLogin, instr.checkRights, instr.isCreator, instr.deleteAssmt);

    app.route('/instr/trainee/:traineeId/rate')
         .post(users.requiresLogin, instr.checkRights, instr.rateFellow);

    app.route('/instr/trainee/:traineeId/rate/:skillId')
        .put(users.requiresLogin, instr.checkRights, instr.editRating)
        .delete(users.requiresLogin, instr.checkRights, instr.deleteRating);

    // Finish by binding the trainee middleware
    app.param('traineeId', instr.traineeByID);

    // Finish by binding the assessment middleware
    app.param('assmtId', instr.assessmentByID);

    // Finish by binding the skillset middleware
    app.param('skillId', instr.skillByID);
 };