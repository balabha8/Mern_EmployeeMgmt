const OrganizationSchema = require("../Models/Organization")

async function insert(organization) {
    try {
        const newOrg = new OrganizationSchema(organization);
        const orgResp = await newOrg.save();
        return orgResp;
    } catch (error) {
        if (error.code === 11000 && error.keyPattern.orgContactNum) {
            throw new Error("Organization with the same contact number is already registered.");
        } else {
            throw error;
        }
    }
}

async function update(orgId, organization) {
    try {
        let orgResp = await OrganizationSchema.findByIdAndUpdate(orgId, organization, { new: true })
        return orgResp;
    } catch (error) {
        throw error;
    }
}

async function fetch(filterBy) {
    try {
        let orgResp = await OrganizationSchema.find(filterBy)
        return orgResp;
    } catch (error) {
        throw error;
    }
}

async function fetchList() {
    try {
        let orgResp = await OrganizationSchema.find()
        return orgResp;
    } catch (error) {
        throw error;
    }
}

async function fetchById(orgId) {
    try {
        let orgResp = await OrganizationSchema.findById(orgId)
        return orgResp;
    } catch (error) {
        throw error;
    }
}

async function del(orgId) {
    try {
        let orgResp = await OrganizationSchema.findByIdAndDelete(orgId)
        return orgResp;
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
