const mongoose = require("mongoose")

const OrganizationSchema = new mongoose.Schema({
    orgName: {
        type: String,
        required: [true, 'Organization name is required.']
    },
    orgAddress: {
        type: String,
        required: [true, 'Organization address is required.']

    },
    orgContactNum: {
        type: String,
        unique: true,
        required: [true, 'Contact Number of the organization is required.']
    },
    orgEmailId: {
        type: String,
    },
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        versionKey: false
    }
)

module.exports = mongoose.model('Organizations', OrganizationSchema)