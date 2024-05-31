const EmpCtrl = require('./empCtrl');
const Joi = require('joi')
const bcrypt = require('bcrypt')

async function add(req, res, next) {
    try {
        const schema = Joi.object({
            empName: Joi.string().required().max(25),
            empAddress: Joi.string().allow(""),
            empMobileNUmber: Joi.string().regex(/^\d{10}$/).required(),
            empEmailId: Joi.string().email().allow(""),
            password: Joi.string().max(12).min(8).required(),
            role: Joi.string().required(),
            organization: Joi.string().required()
        })

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        let empDetails = {
            empName: value.empName,
            empAddress: value.empAddress,
            empMobileNUmber: value.empMobileNUmber,
            empEmailId: value.empEmailId,
            password: bcrypt.hashSync(value.password, 10),
            role: value.role,
            organization: value.organization
        }

        const empResp = await EmpCtrl.insert(empDetails);

        return res.status(200).json({
            status: "Success",
            message: "Employee added successfully.",
            result: empResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function edit(req, res, next) {
    try {
        const schema = Joi.object({
            empName: Joi.string().required().max(25),
            empAddress: Joi.string().allow(""),
            empEmailId: Joi.string().email().allow(""),
            password: Joi.string().max(12).min(8).required()
        })

        const { error, value } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.message });
        }

        let empDetails = {
            empName: value.empName,
            empAddress: value.empAddress,
            empEmailId: value.empEmailId,
            password: value.password
        }

        const empResp = await EmpCtrl.update(req.params, empDetails);

        return res.status(200).json({
            status: "Success",
            message: "Employee details updated successfully.",
            result: empResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function fetchByFilter(req, res, next) {
    try {
        const empResp = await EmpCtrl.fetch(req.body);

        return res.status(200).json({
            status: "Success",
            message: "Employees list fetched successfully.",
            totalRecordCount: empResp && empResp.length !== 0 ? empResp.length : 0,
            result: empResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function list(req, res, next) {
    try {
        const empResp = await EmpCtrl.fetchList();

        return res.status(200).json({
            status: "Success",
            message: "Employees list fetched successfully.",
            totalRecordCount: empResp && empResp.length !== 0 ? empResp.length : 0,
            result: empResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function detail(req, res, next) {
    try {
        const empResp = await EmpCtrl.fetchById(req.params);

        return res.status(200).json({
            status: "Success",
            message: "Employee details fetched successfully.",
            result: empResp
        })

    } catch (e) {
        console.log(e);
        throw new Error(e)
    }
}

async function trash(req, res, next) {
    try {
        await EmpCtrl.del(req.params);

        return res.status(200).json({
            status: "Success",
            message: "Employee trashed successfully.",
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