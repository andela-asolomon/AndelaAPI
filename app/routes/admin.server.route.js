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
    
    //create users
    app.route('/admin/create')
        .post(users.requiresLogin, admin.checkPermission, admin.createUsers);

    //download applicant's cv
    app.route('/admin/download')
        .get(users.requiresLogin, admin.checkPermission, admin.download);

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
        .get(users.requiresLogin, admin.checkPermission, admin.apptRead) //get one particular applicant
        .put(users.requiresLogin, admin.checkPermission, admin.changeStatus); // change applicant's status

    //change applicant/fellow/trainee role
    app.route('/admin/appt/:apptId/role')
        .put(users.requiresLogin, admin.checkPermission, admin.changeRole);

    app.route('/admin/instr/:instrId')
        .get(users.requiresLogin, admin.checkPermission, admin.instrRead)  //get one particular instructor
        .put(users.requiresLogin, admin.checkPermission, admin.changeInstrRole); //change instructor/admin role

    app.route('/admin/user/:userId')
        .delete(users.requiresLogin, admin.checkPermission, admin.deleteUser);

    //current work placement status of a fellow
    // app.route('/admin/fellow/:userId/placement')
    //     .put(users.requiresLogin, admin.checkPermission, admin.placementStatus);
    
    //for adding placements of fellow
    app.route('/admin/fellow/:userId/placements')
        .get(users.requiresLogin, admin.checkPermission, admin.getPlacements)
        .post(users.requiresLogin, admin.checkPermission, admin.addPlacement);

    app.route('/admin/fellow/:userId/placements/:placementId')
        .get(users.requiresLogin, admin.checkPermission, admin.getPlacement) //one particular placement
        .put(users.requiresLogin, admin.checkPermission, admin.editPlacement)
        .delete(users.requiresLogin, admin.checkPermission, admin.deletePlacement);
    
    //create and list bootcamps
    app.route('/admin/camp')
        .get(users.requiresLogin, admin.checkPermission,  admin.bootCamps)
        .post(users.requiresLogin, admin.checkPermission, admin.createBootCamp);
    
    app.route('/admin/camp/:campId')
        .get(users.requiresLogin, admin.checkPermission, admin.read) //one particular bootcamp
        .put(users.requiresLogin, admin.checkPermission, admin.editCamp)
        .delete(users.requiresLogin, admin.checkPermission, admin.deleteCamp);
    
    //list and create tests
    app.route('/admin/test')
        .get(users.requiresLogin, admin.checkPermission, admin.listTests)
        .post(users.requiresLogin, admin.checkPermission, admin.createTests);

    app.route('/admin/test/:testId')
        .get(users.requiresLogin, admin.checkPermission, admin.testRead) //one particular test
        .post(users.requiresLogin, admin.checkPermission, admin.addQuestion)
        .put(users.requiresLogin, admin.checkPermission, admin.updateTestName)
        .delete(users.requiresLogin, admin.checkPermission, admin.deleteTest);

    app.route('/admin/test/:testId/:questId')
        .put(users.requiresLogin, admin.checkPermission, admin.updateQuestion)
        .delete(users.requiresLogin, admin.checkPermission, admin.deleteQuestion);

    app.route('/admin/test/:testId/:questId/options')
        .post(users.requiresLogin, admin.checkPermission, admin.addOption);
        //.put( admin.updateChoices);

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

    // Finish by binding the placement middleware
    app.param('placementId', admin.placementByID);
 };