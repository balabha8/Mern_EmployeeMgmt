const passport = require('passport');
const express = require('express');
const bcrypt = require('bcrypt');
var LocalStrategy = require('passport-local');
const Employee = require("../Models/Employee");
const session = require("express-session");

var strategy = new LocalStrategy({
    usernameField: 'empMobileNUmber',
    passwordField: 'password'
},
    async (empMobileNUmber, password, cb) => {
        console.log("Inside passport setup");
        console.log("empMobileNUmber",empMobileNUmber);

        let employee = await Employee.findOne({ empMobileNUmber: empMobileNUmber });
        if (!employee) {                                                    //when username is invalid    
            return cb(null, false, { message: 'Incorrect username.' });
        }
        else if (!bcrypt.compareSync(password, employee.password)) {                       //when password is invalid
            return cb(null, false, { message: 'Incorrect password.' });
        }
        employee = employee.toObject();
        delete employee.password;
        return cb(null, employee);      //when employee is valid
    }
);
console.log("End passport");




//persist employee data inside the session
passport.serializeUser(function (employee, cb) {
    cb(null, employee.id);
});

//Fetching session details using employee id
passport.deserializeUser(function (id, cb) {
    Employee.findById(id, function (err, employee) {
        done(err, employee);
    });
});

passport.use(strategy);

module.exports = passport;