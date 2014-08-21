'use strict';

/**
 * Module dependencies.
 */
var users = require('../../app/controllers/users'),
    admin = require('../../app/controllers/admin'),
    instr = require('../../app/controllers/instructor');

module.exports = function(app) {
    // Admin Routes
    app.route('/admin')
        .get(users.requiresLogin, admin.checkPermission, admin.listApplicants);

    app.route('/admin/create')
        .post(users.requiresLogin, admin.checkPermission, admin.createUsers);

    app.route('/admin/trainees')
        .get(users.requiresLogin, admin.checkPermission, admin.listTrainees);

    app.route('/admin/applicants')
        .get(users.requiresLogin, admin.checkPermission, admin.listApplicants);

    app.route('/admin/fellows')
        .get(users.requiresLogin, admin.checkPermission, admin.listFellows);

    app.route('/admin/instructors')
        .get(users.requiresLogin, admin.checkPermission, admin.listInstructors);

    app.route('/admin/admins')
        .get(users.requiresLogin, admin.checkPermission, admin.listAdmins);

    app.route('/admin/appt/:apptId')
        .get(users.requiresLogin, admin.checkPermission, admin.apptRead)
        .put(users.requiresLogin, admin.checkPermission, admin.changeStatus);

    app.route('/admin/appt/:apptId/camp/:campId')
        .put(users.requiresLogin, admin.checkPermission, admin.assignBootCamp);

    app.route('/admin/appt/:apptId/role')
        .put(users.requiresLogin, admin.checkPermission, admin.changeRole);

    app.route('/admin/instr/:instrId')
        .get(users.requiresLogin, admin.checkPermission, admin.instrRead)
        .put(users.requiresLogin, admin.checkPermission, admin.changeInstrRole);

    app.route('/admin/user/:userId')
        .delete(users.requiresLogin, admin.checkPermission, admin.deleteUser);

    app.route('/admin/camp')
        .get(users.requiresLogin, admin.checkPermission,  admin.bootCamps)
        .post(users.requiresLogin, admin.checkPermission, admin.createBootCamp);

    app.route('/admin/camp/:campId')
        .get(users.requiresLogin, admin.checkPermission, admin.read)
        .put(users.requiresLogin, admin.checkPermission, admin.editCamp)
        .delete(users.requiresLogin, admin.checkPermission, admin.deleteCamp);

    app.route('/admin/test')
        .get(users.requiresLogin, admin.checkPermission, admin.listTests)
        .post(users.requiresLogin, admin.checkPermission, admin.createTests);

    app.route('/admin/test/:testId')
        .get(users.requiresLogin, admin.checkPermission, admin.testRead)
        .post(users.requiresLogin, admin.checkPermission, admin.addQuestion)
        .put(users.requiresLogin, admin.checkPermission, admin.updateTestName)
        .delete(users.requiresLogin, admin.checkPermission, admin.deleteTest);

    app.route('/admin/test/:testId/:questId')
        .put(users.requiresLogin, admin.checkPermission, admin.updateQuestion)
        .delete(users.requiresLogin, admin.checkPermission, admin.deleteQuestion);

    app.route('/admin/test/:testId/:questId/options')
        .post(users.requiresLogin, admin.checkPermission, admin.addOption)
        .put(users.requiresLogin, admin.checkPermission, admin.updateChoices);

    app.route('/admin/test/:testId/:questId/:optionId')
        .delete(users.requiresLogin, admin.checkPermission, admin.deleteOption);

    app.route('/admin/trainee/:traineeId/rate')
        .post(users.requiresLogin, admin.checkPermission, instr.rateFellow);

    app.route('/admin/trainee/:traineeId/rate/:skillId')
        .put(users.requiresLogin, admin.checkPermission, instr.editRating)
        .delete(users.requiresLogin, admin.checkPermission, instr.deleteRating);

    // Finish by binding the applicant middleware
    app.param('apptId', admin.apptByID);

    // Finish by binding the instructor middleware
    app.param('instrId', admin.instrByID);

    // Finish by binding the delete user middleware
    app.param('userId', users.userByID);

    // Finish by binding the bootcamp middleware
    app.param('campId', admin.campByID);

    // Finish by binding the test middleware
    app.param('testId', admin.testByID);

    // Finish by binding the question middleware
    app.param('questId', admin.questByID);

    // Finish by binding the trainee middleware
    app.param('traineeId', instr.traineeByID);

    // Finish by binding the skillset middleware
    app.param('skillId', instr.skillByID);
 };