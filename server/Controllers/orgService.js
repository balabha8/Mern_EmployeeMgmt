const OrgCtrl = require('./orgCtrl');
const Joi = require('joi')

async function add(req, res, next) {
    try {
        const schema = Joi.object({
            orgName: Joi.string().required().max(25),
            orgAddress: Joi.string().required(),
            orgContactNum: Joi.string().regex(/^\d{10}$/).required(),
            orgEmailId: Joi.string().email().allow("")
        })

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        let orgDetails = {
            orgName: value.orgName,
            orgAddress: value.orgAddress,
            orgContactNum: value.orgContactNum,
            orgEmailId: value.orgEmailId
        }

        const orgResp = await OrgCtrl.insert(orgDetails);

        return res.status(200).json({
            status: "Success",
            message: "Organization added successfully.",
            result: orgResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function edit(req, res, next) {
    try {
        const schema = Joi.object({
            orgName: Joi.string().required().max(25),
            orgAddress: Joi.string().required(),
            orgEmailId: Joi.string().email().allow("")
        })

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        let orgDetails = {
            orgName: value.orgName,
            orgAddress: value.orgAddress,
            orgEmailId: value.orgEmailId
        }

        const orgResp = await OrgCtrl.update(req.params, orgDetails);

        return res.status(200).json({
            status: "Success",
            message: "Organization details updated successfully.",
            result: orgResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function fetchByFilter(req, res, next) {
    try {
        const orgResp = await OrgCtrl.fetch(req.body);

        return res.status(200).json({
            status: "Success",
            message: "Organization list fetched successfully.",
            totalRecordCount: orgResp && orgResp.length !== 0 ? orgResp.length : 0,
            result: orgResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function list(req, res, next) {
    try {
        const orgResp = await OrgCtrl.fetchList();

        return res.status(200).json({
            status: "Success",
            message: "Organization list fetched successfully.",
            totalRecordCount: orgResp && orgResp.length !== 0 ? orgResp.length : 0,
            result: orgResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function detail(req, res, next) {
    try {
        const orgResp = await OrgCtrl.fetchById(req.params);

        return res.status(200).json({
            status: "Success",
            message: "Organization details fetched successfully.",
            result: orgResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function trash(req, res, next) {
    try {
        await OrgCtrl.del(req.params);

        return res.status(200).json({
            status: "Success",
            message: "Organization trashed successfully.",
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

module.exports = {
    add,
    edit,
    list,
    detail,
    fetchByFilter,
    trash
}