'use strict';

(function() {
	// Bootcamps Controller Spec
	describe('Bootcamps Controller Tests', function() {
		// Initialize global variables
		var BootcampsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Bootcamps controller.
			BootcampsController = $controller('BootcampsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Bootcamp object fetched from XHR', inject(function(Bootcamps) {
			// Create sample Bootcamp using the Bootcamps service
			var sampleBootcamp = new Bootcamps({
				name: 'New Bootcamp'
			});

			// Create a sample Bootcamps array that includes the new Bootcamp
			var sampleBootcamps = [sampleBootcamp];

			// Set GET response
			$httpBackend.expectGET('bootcamps').respond(sampleBootcamps);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bootcamps).toEqualData(sampleBootcamps);
		}));

		it('$scope.findOne() should create an array with one Bootcamp object fetched from XHR using a bootcampId URL parameter', inject(function(Bootcamps) {
			// Define a sample Bootcamp object
			var sampleBootcamp = new Bootcamps({
				name: 'New Bootcamp'
			});

			// Set the URL parameter
			$stateParams.bootcampId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/bootcamps\/([0-9a-fA-F]{24})$/).respond(sampleBootcamp);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.bootcamp).toEqualData(sampleBootcamp);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Bootcamps) {
			// Create a sample Bootcamp object
			var sampleBootcampPostData = new Bootcamps({
				name: 'New Bootcamp'
			});

			// Create a sample Bootcamp response
			var sampleBootcampResponse = new Bootcamps({
				_id: '525cf20451979dea2c000001',
				name: 'New Bootcamp'
			});

			// Fixture mock form input values
			scope.name = 'New Bootcamp';

			// Set POST response
			$httpBackend.expectPOST('bootcamps', sampleBootcampPostData).respond(sampleBootcampResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Bootcamp was created
			expect($location.path()).toBe('/bootcamps/' + sampleBootcampResponse._id);
		}));

		it('$scope.update() should update a valid Bootcamp', inject(function(Bootcamps) {
			// Define a sample Bootcamp put data
			var sampleBootcampPutData = new Bootcamps({
				_id: '525cf20451979dea2c000001',
				name: 'New Bootcamp'
			});

			// Mock Bootcamp in scope
			scope.bootcamp = sampleBootcampPutData;

			// Set PUT response
			$httpBackend.expectPUT(/bootcamps\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/bootcamps/' + sampleBootcampPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid bootcampId and remove the Bootcamp from the scope', inject(function(Bootcamps) {
			// Create new Bootcamp object
			var sampleBootcamp = new Bootcamps({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Bootcamps array and include the Bootcamp
			scope.bootcamps = [sampleBootcamp];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/bootcamps\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleBootcamp);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.bootcamps.length).toBe(0);
		}));
	});
}());