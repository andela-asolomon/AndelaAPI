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

    //create and get skill categories
    app.route('/admin/skillCategories')
        .get(users.requiresLogin, admin.checkPermission, admin.listSkillCategories)
        .post(users.requiresLogin, admin.checkPermission, admin.createSkillCategory);

    //edit and delete skill categories
    app.route('/admin/skillCategories/:skillCategoryId')
        .get(users.requiresLogin, admin.checkPermission, admin.getSkillCategory)
        .put(users.requiresLogin, admin.checkPermission, admin.updateSkillCategory);
        //.delete(users.requiresLogin, admin.checkPermission, admin.deleteSkillCategory);

    //Skills API
    app.route('/admin/skills')
        .get(users.requiresLogin, admin.checkPermission, admin.listSkills);

    app.route('/admin/skillCategories/:skillCategoryId/skills')
        .get(users.requiresLogin, admin.checkPermission, admin.listSkillsByCategory)
        .post(users.requiresLogin, admin.checkPermission, admin.createSkill);

    //add a skill rating to fellows
    app.route('/admin/trainee/:traineeId/skills/:skillId')
        .put(users.requiresLogin, admin.checkPermission, instr.editFellowRating);

    
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

    // Finish by binding the skill category middleware
    app.param('skillCategoryId', admin.skillCategoryByID);
    app.param('skillId', admin.skillById);
};