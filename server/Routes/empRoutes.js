const express = require("express");
const empService = require("../Controllers/empService");

const empRoutes = express.Router();
empRoutes.route('/').post(empService.add);
empRoutes.route('/:_id').put(empService.edit);
empRoutes.route('/').get(empService.list);
empRoutes.route('/getOne').post(empService.fetchByFilter);
empRoutes.route('/:_id').get(empService.detail);
empRoutes.route('/:_id').delete(empService.trash)

module.exports = empRoutes;