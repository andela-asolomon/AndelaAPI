// 'use strict';

// /**
//  * Module dependencies.
//  */
// var users = require('../../app/controllers/users'),
//     admin = require('../../app/controllers/admin'),
//     instr = require('../../app/controllers/instructor');

// module.exports = function(app) {
//     // Admin Routes
//     app.route('/instr')
//         .get(users.requiresLogin, admin.checkPermission, admin.listTrainees);

//     app.route('/instr/fellows')
//         .get(users.requiresLogin, admin.checkPermission, admin.listFellows);

//     app.route('/instr/trainee/:traineeId')
//         .get(users.requiresLogin, admin.checkPermission, admin.readTrainee)
//         .post(users.requiresLogin, admin.checkPermission, instr.createAssmt);

//     app.route('/instr/trainee/:traineeId/:assmtId')
//         .delete(users.requiresLogin, admin.checkPermission, instr.readTrainee);

//     app.route('/admin/appt/:apptId')
//         .get(users.requiresLogin, admin.checkPermission, admin.apptRead)
//         .put(users.requiresLogin, admin.checkPermission, admin.changeStatus);

//     app.route('/admin/appt/:apptId/:campId')
//         .put(users.requiresLogin, admin.checkPermission, admin.assignBootCamp);

//     app.route('/admin/appt/:apptId/role')
//         .put(users.requiresLogin, admin.checkPermission, admin.changeRole);

//     app.route('/admin/instr/:instrId')
//         .get(users.requiresLogin, admin.checkPermission, admin.instrRead)
//         .put(users.requiresLogin, admin.checkPermission, admin.changeInstrRole);

//     app.route('/admin/user/:userId')
//         .delete(users.requiresLogin, admin.checkPermission, admin.deleteUser);

//     app.route('/admin/camp')
//         .get(users.requiresLogin, admin.checkPermission,  admin.bootCamps)
//         .post(users.requiresLogin, admin.checkPermission, admin.createBootCamp);

//     app.route('/admin/camp/:campId')
//         .get(users.requiresLogin, admin.checkPermission, admin.read)
//         .put(users.requiresLogin, admin.checkPermission, admin.editCamp)
//         .delete(users.requiresLogin, admin.checkPermission, admin.deleteCamp);

//     app.route('/admin/test')
//         .get(users.requiresLogin, admin.checkPermission, admin.listTests)
//         .post(users.requiresLogin, admin.checkPermission, admin.createTests);

//     app.route('/admin/test/:testId')
//         .get(users.requiresLogin, admin.checkPermission, admin.testRead)
//         .post(users.requiresLogin, admin.checkPermission, admin.addQuestion)
//         .put(users.requiresLogin, admin.checkPermission, admin.updateTest)
//         .delete(users.requiresLogin, admin.checkPermission, admin.deleteTest);

//     app.route('/admin/test/:testId/:questId')
//         .put(users.requiresLogin, admin.checkPermission, admin.updateChoices)
//         .delete(users.requiresLogin, admin.checkPermission, admin.deleteQuestion);

//     app.route('/admin/test/:testId/:questId/:optionId')
//         .post(users.requiresLogin, admin.checkPermission, admin.addOption)
//         .delete(users.requiresLogin, admin.checkPermission, admin.deleteOption);

//     // Finish by binding the applicant middleware
//     app.param('apptId', admin.apptByID);

//     // Finish by binding the instructor middleware
//     app.param('instrId', admin.instrByID);

//     // Finish by binding the delete user middleware
//     app.param('userId', users.userByID);

//     // Finish by binding the bootcamp middleware
//     app.param('campId', admin.campByID);

//     // Finish by binding the test middleware
//     app.param('testId', admin.testByID);

//     // Finish by binding the question middleware
//     app.param('questId', admin.questByID);
//  };