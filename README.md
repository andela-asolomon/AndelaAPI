Proect Name: ANDELA 
Description: Andela Website
List of APIs: 	localhost:3000/admin,
				localhost:3000/instructor,
				localhost:3000/users,
				localhost:3000/auth,
				localhost:3000/test

Methods on APIs: 


/admin
	admin [GET]
	admin/create [POST]
	admin/trainees [GET]
	admin/applicants [GET]
	admin/fellows [GET]
	admin/instructors [GET]
	admin/admins [GET]
	admin/appt/:apptId [GET, POST]
	admin/appt/:apptId/camp/:campId [PUT]
	admin/appt/:apptId/role [PUT]
	admin/instr/:instrId [GET, PUT]
	admin/user/:userId [DELETE]
	admin/camp [GET, POST]
		Argument:
		Respons:
		{
        "_id" : ObjectId("53f3402fdcc65f80276ef002"),
        "camp_name" : "Alpha",
        "applicants" : [
                {
                        "_id" : ObjectId("53f4770809a97398
                        "role" : "applicant",
                        "username" : "sdsdd",
                        "provider" : "local",
                        "_type" : "Applicant",
                        "__v" : 0,
                        "skillSets" : [ ],
                        "created" : ISODate("2014-08-20T10
                        "email" : "dfds@yahoo.com",
                        "lastName" : "errr",
                        "firstName" : "Olatun"
                }
        ],
        "created" : ISODate("2014-08-19T12:16:47.292Z"),
        "assessments" : [ ],
        "__v" : 1
}
{
        "_id" : ObjectId("53f90ef7a937c5e4305e7cc6"),
        "camp_name" : "Beta",
        "applicants" : [ ],
        "created" : ISODate("2014-08-23T22:00:23.078Z"),
        "__v" : 0
}
		[POST]
			Argument:
			Response:
				{
        "_id" : ObjectId("53f90ef7a937c5e4305e7cc6"),
        "camp_name" : "Beta",
        "applicants" : [ ],
        "created" : ISODate("2014-08-23T22:00:23.078Z"),
        "__v" : 0
}
	admin/camp/:campId [GET, PUT, DELETE]
	admin/test [GET, POST]
	admin/test/:testId [GET, POST, PUT, DELETE]
	admin/test/:testId/:questId [PUT, DELETE]
	admin/test/:testId/:questId/options [POST, PUT]
	admin/test/:testId/:questId/:optionId [DELETE]
	admin/trainee/:traineeId/rate [POST]
	admin/trainee/:traineeId/rate/:skillId [PUT, DELETE]

/instructor
	instr [GET] 
	instr/fellows [GET]
	instr/trainee/:traineeId [GET, POST, PUT]
	instr/trainee/:traineeId/:assmtId [PUT, DELETE]
	instr/trainee/:traineeId/rate [POST]
	instr/trainee/:traineeId/rate/:skillId [PUT, DELETE]

/test
	test/:testId [GET]

/users
	users/me [GET]
	users [PUT]
	users/password [POST]
	users/accounts [DELETE]
	users/view [GET]

/auth
	auth/:campId/signup [POST]
	auth/signin [POST]
	auth/signout [GET]


Response:
admin [GET]
	gets the list of Applicants
	Arguments
		login required.
	response:
		[
	    {
	        "_id": "53f4770809a973981ed4ec5e",
	        "salt": "�\f�]��\u0017\"%�����(�",
	        "_type": "Applicant",
	        "provider": "local",
	        "username": "sdsdd",
	        "role": "applicant",
	        "__v": 0,
	        "assessments": [],
	        "skillSets": [],
	        "created": "2014-08-20T10:23:04.779Z",
	        "roles": [
	            "user"
	        ],
	        "password": "t3+MBANoTxtfbgH1TO2V8AWqVNfoCKW/SOGRrUIBxLO35y8/lnC9ccyyx7QYHRf2N5g5rtYitsUx0C9xrEhHJA==",
	        "email": "dfds@yahoo.com",
	        "lastName": "errr",
	        "firstName": "Olatun"
	    }
	]

	Arguments:
		id: not required.f
		login required.
admin/create [POST]
	creates a admin and instructors.
	response:
admin/trainees [GET]
	gets the list of trainees.
	response:
		[
    {
        "_id": "53f9019bb1bdf9a02c5b8194",
        "salt": "w�\\�C!�ڰ �\n�T�G",
        "_type": "Trainee",
        "username": "gmt",
        "role": "trainee",
        "provider": "local",
        "__v": 0,
        "created": "2014-08-23T21:03:23.092Z",
        "roles": [
            "user"
        ],
        "password": "z2c3Hjk9P7UFJ9at6yyHaVuexDGcjL24adrkjrdIOWtHaiAPr3YciHhIDFygWerakcv5E/JAZ38SJ6darzQvEQ==",
        "email": "generalgmt@yahoo.co.uk",
        "lastName": "Miguel",
        "firstName": "Olatunde"
    }
]
admin/applicants [GET]
	Arguments:
		login required.
	Response:
		[
    {
        "_id": "53f4770809a973981ed4ec5e",
        "salt": "�\f�]��\u0017\"%�����(�",
        "_type": "Applicant",
        "provider": "local",
        "username": "sdsdd",
        "role": "applicant",
        "__v": 0,
        "assessments": [],
        "skillSets": [],
        "created": "2014-08-20T10:23:04.779Z",
        "roles": [
            "user"
        ],
        "password": "t3+MBANoTxtfbgH1TO2V8AWqVNfoCKW/SOGRrUIBxLO35y8/lnC9ccyyx7QYHRf2N5g5rtYitsUx0C9xrEhHJA==",
        "email": "dfds@yahoo.com",
        "lastName": "errr",
        "firstName": "Olatun"
    }
]
admin/fellows [GET]
	Arguments:
		login required.
	Response:
		[
    {
        "_id": "53f9019bb1bdf9a02c5b8194",
        "salt": "w�\\�C!�ڰ �\n�T�G",
        "_type": "Fellow",
        "username": "gmt",
        "role": "fellow",
        "provider": "local",
        "__v": 0,
        "skillSets": [],
        "created": "2014-08-23T21:03:23.092Z",
        "roles": [
            "user"
        ],
        "password": "z2c3Hjk9P7UFJ9at6yyHaVuexDGcjL24adrkjrdIOWtHaiAPr3YciHhIDFygWerakcv5E/JAZ38SJ6darzQvEQ==",
        "email": "generalgmt@yahoo.co.uk",
        "lastName": "Miguel",
        "firstName": "Olatunde"
    }
]
admin/instructors [GET]
	Arguments:
		login required.
	Response:
		[
    {
        "_id": "53f9019bb1bdf9a02c5b8194",
        "salt": "w�\\�C!�ڰ �\n�T�G",
        "_type": "Instructor",
        "username": "gmt",
        "role": "Instructor",
        "provider": "local",
        "__v": 0,
        "skillSets": [],
        "created": "2014-08-23T21:03:23.092Z",
        "roles": [
            "user"
        ],
        "password": "z2c3Hjk9P7UFJ9at6yyHaVuexDGcjL24adrkjrdIOWtHaiAPr3YciHhIDFygWerakcv5E/JAZ38SJ6darzQvEQ==",
        "email": "generalgmt@yahoo.co.uk",
        "lastName": "Miguel",
        "firstName": "Olatunde"
    }
]
admin/admins [GET]
	Arguments:
		login required.
	Response:
		[
    {
        "_id": "53f9019bb1bdf9a02c5b8194",
        "salt": "w�\\�C!�ڰ �\n�T�G",
        "_type": "Instructor",
        "username": "gmt",
        "role": "admin",
        "provider": "local",
        "__v": 0,
        "skillSets": [],
        "created": "2014-08-23T21:03:23.092Z",
        "roles": [
            "user"
        ],
        "password": "z2c3Hjk9P7UFJ9at6yyHaVuexDGcjL24adrkjrdIOWtHaiAPr3YciHhIDFygWerakcv5E/JAZ38SJ6darzQvEQ==",
        "email": "generalgmt@yahoo.co.uk",
        "lastName": "Miguel",
        "firstName": "Olatunde"
    }
]
admin/appt/:apptId [GET, POST]
	response:
	Arguments:
		id: not required.f
		login required.
admin/appt/:apptId/camp/:campId [PUT]
	response:
	Arguments:
		id: not required.f
		login required.
admin/appt/:apptId/role [PUT]
	response:
	Arguments:
		id: not required.f
		login required.
admin/instr/:instrId [GET, PUT]
	response:
	Arguments:
		id: not required.f
		login required.
admin/user/:userId [DELETE]
	response:
	Arguments:
		id: not required.f
		login required.
admin/camp [GET, POST]
[GET]
	gets the list of created Camps
	Arguments:
		login required.
		Response:
			[
    {
        "_id": "53f3402fdcc65f80276ef002",
        "camp_name": "Alpha",
        "__v": 1,
        "applicants": [],
        "created": "2014-08-19T12:16:47.292Z"
    }
]
[POST]
	Creates a new Bootcamp
		Arguments:
		login required.
		Response:
			[
    {
        "_id": "53f3402fdcc65f80276ef002",
        "camp_name": "Alpha",
       "__v": 1,
        "applicants": [],
        "created": "2014-08-19T12:16:47.292Z"
    }
]
admin/camp/:campId [GET, PUT, DELETE]
[GET]
	gets an individual camp by id
	Arguments:
		id: id required
		login required.
	Response:
		{
    "_id": "53f90ef7a937c5e4305e7cc6",
    "camp_name": "Beta",
    "__v": 0,
    "applicants": []
    "created": "2014-08-19T12:16:47.292Z"
}
[PUT]
	Updates an individual camp by id
	Arguments:
		id: id required
		login required.
	Response:
		{
    "_id": "53f90ef7a937c5e4305e7cc6",
    "camp_name": "Beta",
    "__v": 0,
    "applicants": []
    "created": "2014-08-19T12:16:47.292Z"
}
[DELETE]
	Deletes	 an individual camp by id
	Arguments:
		id: id required
		login required.
	Response:
		{
    "_id": "53f90ef7a937c5e4305e7cc6",
    "camp_name": "Beta",
    "__v": 0,
    "applicants": []
    "created": "2014-08-19T12:16:47.292Z"
}
admin/test [GET, POST]
	response:
	Arguments:
		id: not required.f
		login required.
admin/test/:testId [GET, POST, PUT, DELETE]
	response:
	Arguments:
		id: not required.f
		login required.
admin/test/:testId/:questId [PUT, DELETE]
	response:
	Arguments:
		id: not required.f
		login required.
admin/test/:testId/:questId/options [POST, PUT]
	response:
	Arguments:
		id: not required.f
		login required.
admin/test/:testId/:questId/:optionId [DELETE]
	response:
	Arguments:
		id: not required.f
		login required.
admin/trainee/:traineeId/rate [POST]
	response:
	Arguments:
		id: not required.f
		login required.
admin/trainee/:traineeId/rate/:skillId [PUT, DELETE]
	response:
	Arguments:
		id: not required.f
		login required.
auth/:campId/signup [POST]
	Response:
	Arguments:
		id: not required.f
		login required.
auth/signin [POST]
	Arguments:
		id: not required.
	Response:
		{
		    "_id": "53f9019bb1bdf9a02c5b8194",
		    "_type": "Instructor",
		    "username": "gmt",
		    "role": "admin",
		    "provider": "local",
		    "skillSets": [],
		    "__v": 0,
		    "created": "2014-08-23T21:03:23.092Z",
		    "roles": [
		        "user"
		    ],
		    "email": "generalgmt@yahoo.co.uk",
		    "lastName": "Miguel",
		    "firstName": "Olatunde"
		}

auth/signout [GET]
	response:
	Arguments:
		id: not required.f
		login required.
instr [GET] 
	response:
	Arguments:
		id: not required.f
		login required.
instr/fellows [GET]
	response:
	Arguments:
		id: not required.f
		login required.
instr/trainee/:traineeId [GET, POST, PUT]
response:
	Arguments:
		id: not required.f
		login required.
instr/trainee/:traineeId/:assmtId [PUT, DELETE]
	response:
	Arguments:
		id: not required.f
		login required.
instr/trainee/:traineeId/rate [POST]
	response:
	Arguments:
		id: not required.f
		login required.
instr/trainee/:traineeId/rate/:skillId [PUT, DELETE]
	response:
	Arguments:
		id: not required.f
		login required.
test/:testId [GET]
	response:
	Arguments:
		id: not required.f
		login required.
users/me [GET]
	response:
	Arguments:
		id: not required.f
		login required.
users [GET, PUT]
	response:
	Arguments:
		id: not required.f
		login required.
users/password [POST]
	response:
	Arguments:
		id: not required.f
		login required.
users/accounts [DELETE]
	response:
	Arguments:
		id: not required.f
		login required.
users/view [GET]
	response:
	Arguments:
		id: not required.f
		login required.


