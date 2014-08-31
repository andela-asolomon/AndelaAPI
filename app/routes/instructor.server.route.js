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
    
    //instructor updates his personal info
    app.route('/instr/updateInfo')
        .post( instr.updateInfo);

    //instructor can delete his photo avatar
    app.route('/instr/:userId/deletePhoto')
        .delete( instr.deletePhoto);

    app.route('/instr/fellows')
        .get(users.requiresLogin, instr.checkRights, admin.listFellows);

    app.route('/instr/bootcamps')
        .get(users.requiresLogin, instr.checkRights, admin.bootCamps);
    
    //instructor can add skills for himself
    app.route('/instr/skill')
        .post(users.requiresLogin, instr.checkRights, instr.addSkills);

    //instructor can edit and delete his own rating
    app.route('/instr/skill/:userId/:skillId')
        .put(users.requiresLogin, instr.checkRights, instr.editRating)
        .delete(users.requiresLogin, instr.checkRights, instr.deleteRating);

    app.route('/instr/camp/:campId')
        .get(users.requiresLogin, instr.checkRights, admin.read); //one particular bootcamp

    app.route('/instr/trainee/:traineeId')
        .get(users.requiresLogin, instr.checkRights, instr.readTrainee)
        .put(users.requiresLogin, instr.checkRights, instr.selectFellow)
        .post(users.requiresLogin, instr.checkRights, instr.createAssmt); //record trainee assessments

    app.route('/instr/trainee/:traineeId/:assmtId')
        .put(users.requiresLogin, instr.checkRights, instr.isCreator, instr.updateAssmt)
        .delete(users.requiresLogin, instr.checkRights, instr.isCreator, instr.deleteAssmt);

    app.route('/instr/trainee/:traineeId/rate')
         .post(users.requiresLogin, instr.checkRights, instr.rateFellow); //rate fellow's skills

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