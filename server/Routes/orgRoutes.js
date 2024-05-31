const express = require("express");
const orgService = require("../Controllers/orgService");

const orgRoutes = express.Router();
orgRoutes.route('/').post(orgService.add);
orgRoutes.route('/:_id').put(orgService.edit);
orgRoutes.route('/').get(orgService.list);
orgRoutes.route('/getOne').post(orgService.fetchByFilter);
orgRoutes.route('/:_id').get(orgService.detail);
orgRoutes.route('/:_id').delete(orgService.trash)

module.exports = orgRoutes;