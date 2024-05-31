const variables = {
    SERVER: "http://localhost:4000/api/",
    ORG_HEADERS: [
        { header: "Name" },
        { header: "Contact Number" },
        { header: "Email Id" },
        { header: "Address" },
        { header: "" },
        { header: "" }

    ],
    EMP_HEADERS: [
        { header: "Employee Name" },
        { header: "Mobile Number" },
        { header: "Email Id" },
        { header: "Address" },
        { header: "Role" },
        { header: "Organization" },
        { header: "" },
        { header: "" }
    ],
    role_options:[
        { option: "Admin" },
        { option: "User" }
    ]
}

export default variables;