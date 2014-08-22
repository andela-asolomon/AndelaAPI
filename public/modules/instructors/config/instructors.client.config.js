'use strict';

// Configuring the Articles module
angular.module('instructors').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('y', 'Instructors', 'instructors', 'dropdown', '/instructors(/create)?');
		Menus.addSubMenuItem('y', 'instructors', 'List Instructors', 'instructors');
		Menus.addSubMenuItem('y', 'instructors', 'New Instructor', 'instructors/create');
	}
]);