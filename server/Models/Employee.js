const mongoose = require("mongoose");

const EmployeeSchema = mongoose.Schema({
    empName: {
        type: String,
        required: [true, 'Employee name is required.']
    },
    empMobileNUmber: {
        type: String,
        unique: true,
        required: [true, 'Employee mobile number is required.']
    },
    empEmailId: {
        type: String
    },
    empAddress: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    role: {
        type: String,
        required: [true, 'Role is required.'],
        enum: ["Admin", "User"]
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organizations"
    }
},
    {
        timeStamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        versionKey: false
    }
)

module.exports = mongoose.model("Employees", EmployeeSchema)