const EmployeeSchema = require("../Models/Employee")

async function insert(employee) {
    try {
        const newEmp = new EmployeeSchema(employee);
        const empResp = await newEmp.save();
        return empResp;
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.empMobileNUmber) {
            throw new Error("Employee with the same mobile number is already registered.");
        } else {
            throw error;
        }
    }
}

async function update(empId, employee) {
    try {
        let empResp = await EmployeeSchema.findByIdAndUpdate(empId, employee, { new: true })
        return empResp;
    } catch (error) {
        throw error;
    }
}

async function fetch(filterBy) {
    try {
        let empResp = await EmployeeSchema.find(filterBy)
        return empResp;
    } catch (error) {
        throw error;
    }
}

async function fetchList() {
    try {
        let empResp = await EmployeeSchema.find()
        return empResp;
    } catch (error) {
        throw error;
    }
}

async function fetchById(empId) {
    try {
        let empResp = await EmployeeSchema.findById(empId)
        return empResp;
    } catch (error) {
        throw error;
    }
}

async function del(empId) {
    try {
        let empResp = await EmployeeSchema.findByIdAndDelete(empId)
        return empResp;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    insert,
    update,
    fetch,
    fetchById,
    fetchList,
    del
}
