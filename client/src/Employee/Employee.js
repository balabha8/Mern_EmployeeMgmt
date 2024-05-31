import { useEffect, useState } from "react";
import { getEmpList, AddEmp, EditEmp, DeleteEmp } from "../Services/EmpService";
import { getOrgList } from "../Services/Orgservice";
import { Table, TableBody, TableCell, TableContainer, TableHead, InputLabel, Select, MenuItem, TableRow, Snackbar, Paper, TextField, FormControlLabel, Box, IconButton, Container, Fab, Grid, Dialog, DialogContent, DialogActions, DialogTitle, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";

import variables from "../Common";
import '../App.css';
import Dashboard from "../Dashboard/Dashboard";

export default function Employee() {
    const [empList, setEmpList] = useState([]);
    const [orgList, setOrgList] = useState([]);
    const [openAddEmp, setOpenAddEmp] = useState(false);
    const [openEditEmp, setOpenEditEmp] = useState(false);
    const [opendeleteEmp, setOpenDelete] = useState(false);

    const [empName, setEmpName] = useState("");
    const [empAddress, setEmpAddress] = useState("");
    const [empMobileNUmber, setEmpMobileNUmber] = useState("");
    const [empEmailId, setEmpEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [organization, setOrganization] = useState("");
    const [organizationId, setOrganizationId] = useState("")


    const [openSnack, setOpenSnack] = useState(false);
    const [snacKMsg, setSnacKMsg] = useState("");
    const disableAdd = !empName || !empMobileNUmber || empMobileNUmber.length !== 10 || !role || !organizationId || !password;

    const [selectedRow, setSelectedRow] = useState({});
    const [empNameEdit, setEmpNameEdit] = useState("");
    const [empAddressEdit, setEmpAddressEdit] = useState("");
    const [empEmailIdEdit, setEmpEmailIdEdit] = useState("");
    const [passwordEdit, setPasswordEdit] = useState("");

    const disableEdit = !empNameEdit || !empAddressEdit || !passwordEdit || passwordEdit.length < 8 ||
        passwordEdit.length > 12;

    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

    const fetchList = async () => {
        try {
            let resp = await getEmpList();
            setEmpList(resp.result);
            let orgResp = await getOrgList();
            setOrgList(orgResp.result);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchList()

    }, [])

    useEffect(() => {
        if (selectedRow) {
            setEmpNameEdit(selectedRow.empName);
            setEmpAddressEdit(selectedRow.empAddress);
            setPasswordEdit(selectedRow.password);
            setEmpEmailIdEdit(selectedRow.empEmailId)
        }
    }, [selectedRow]);

    const openAddDialog = () => {
        setOpenAddEmp(true);
    }

    const handleClose = () => {
        setOpenAddEmp(false);
        resetFields()
    }

    const handleEditClose = () => {
        setOpenEditEmp(false);
    }

    const handleDeleteDialog = () => {
        setOpenDelete(false);
    }

    const handleSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handleAddEmp = async () => {
        try {
            let empDetails = {
                empName, empAddress, empMobileNUmber, empEmailId, password, organization: organizationId, role
            }
            let resp = await AddEmp(empDetails);
            if (resp.status === "Success") {
                setOpenSnack(true);
                resetFields();
                handleClose();
                setSnacKMsg("Employee added successfully");
                fetchList();
            }
        } catch (e) {
            console.log(e)
            setOpenSnack(true);
            setSnacKMsg("Failed to add employee");
        }

    }

    const handleEditEmp = async (emp) => {
        try {
            setSelectedEmployeeId(selectedRow._id);
            let empDetails = {
                empName: empNameEdit,
                empAddress: empAddressEdit,
                empEmailId: empEmailIdEdit,
                password: passwordEdit
            }
            let resp = await EditEmp(selectedRow._id, empDetails);
            if (resp.status === "Success") {
                setOpenSnack(true);
                setOpenEditEmp(false);
                setSnacKMsg("Employee updated successfully");
                fetchList();
            }
        } catch (e) {
            console.log(e)
            setOpenSnack(true);
            setSnacKMsg("Failed to save details of employee");
        }

    }

    const handleDeleteEmp = async () => {
        try {
            let resp = await DeleteEmp(selectedEmployeeId);
            if (resp.status === "Success") {
                setOpenSnack(true);
                handleDeleteDialog();
                setSnacKMsg("Employee deleted successfully");
                fetchList();
            }
        } catch (e) {
            console.log(e)
            setOpenSnack(true);
            setSnacKMsg("Failed to delete employee");
        }

    }

    const resetFields = () => {
        setEmpAddress(""); setEmpMobileNUmber(""); setEmpName(""); setPassword("");
    }

    const handleRowClick = (emp) => {
        setSelectedRow(emp);
        setOpenEditEmp(true);
    }

    const handleDelete = (emp) => {
        setSelectedEmployeeId(emp._id);
        setOpenDelete(true);
    }

    return (
        <>
        <Dashboard/>
            {/* <Container component="main" sx={{ width: '100vw', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}> */}
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft:"30px", marginRight:"30px" }}>
                    <Grid container spacing={2} >
                        <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Fab color="primary" aria-label="add" onClick={openAddDialog}>
                                <AddIcon />
                            </Fab>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <TableContainer component={Paper} sx={{ width: '100%' }}>
                                    <Table sx={{ minWidth: 1400 }} aria-label="simple table">
                                        <TableHead className="tableHeader">
                                            <TableRow>
                                                {variables.EMP_HEADERS.map((emp, index) => (
                                                    <TableCell sx={{ color: "#091040", textAlign: "center", fontWeight: "700" }} key={index}>{emp.header}</TableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {empList.map((emp, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                // onClick={() => handleRowClick(emp)}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {emp.empName}
                                                    </TableCell>
                                                    <TableCell align="center">{emp.empMobileNUmber}</TableCell>
                                                    <TableCell align="center">{emp.empEmailId ? emp.empEmailId : "-"}</TableCell>
                                                    <TableCell align="center">{emp.empAddress}</TableCell>
                                                    <TableCell align="center">{emp.role}</TableCell>
                                                    <TableCell align="center">{emp.organization && orgList.find((org) => org._id === emp.organization)?.orgName}</TableCell>
                                                    <TableCell align="center"><EditIcon onClick={() => handleRowClick(emp)} /></TableCell>
                                                    <TableCell align="center"><DeleteIcon onClick={() => handleDelete(emp)} /></TableCell>


                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {openAddEmp && <Box>
                    <>
                        <Dialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={openAddEmp}
                            maxWidth={"md"}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} className="tableHeader" id="customized-dialog-title">
                                Add Employee
                            </DialogTitle>
                            <DialogContent dividers>
                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Name"
                                                onChange={(e) => setEmpName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Address"
                                                onChange={(e) => setEmpAddress(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                onChange={(e) => setEmpEmailId(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Contact Number"
                                                onChange={(e) => setEmpMobileNUmber(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel id="demo-simple-select-label">Select Role</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                onChange={(e) => setRole(e.target.value)}
                                            >
                                                {variables.role_options.map((role, index) => (
                                                    <MenuItem value={role.option} key={index} >{role.option}</MenuItem>
                                                ))
                                                }
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel id="demo-simple-select-label">Select Organization</InputLabel>
                                            <Select
                                                fullWidth
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                onChange={(e) => {
                                                    const selectedIndex = e.target.value;
                                                    setOrganizationId(selectedIndex)
                                                    const selectedOrganization = orgList.find(item => item._id === selectedIndex);
                                                    setOrganization(selectedOrganization.orgName);
                                                }}
                                            >
                                                {orgList && orgList.map((org) => (
                                                    <MenuItem value={org._id} key={org._id} >{org.orgName}</MenuItem>
                                                ))
                                                }
                                            </Select>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                fullWidth
                                                label="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} style={{ backgroundColor: "#e1d7d7", color: "#485467", fontWeight: "700" }}>
                                    Cancel
                                </Button>
                                <Button sx={{
                                    backgroundColor: disableAdd ? '#D3D3D3' : '#A1DD70',
                                    color: disableAdd ? '#A9A9A9' : '#006769',
                                    fontWeight: '700',
                                    '&:hover': {
                                        backgroundColor: disableAdd ? '#D3D3D3' : '#90C15C'
                                    }
                                }} disabled={disableAdd} onClick={handleAddEmp}>
                                    Add
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                </Box>}

                {openEditEmp && <Box>
                    <>
                        <Dialog
                            onClose={handleEditClose}
                            aria-labelledby="customized-dialog-title"
                            open={openEditEmp}
                            maxWidth={"md"}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} className="tableHeader" id="customized-dialog-title">
                                Edit Employee
                            </DialogTitle>
                            <DialogContent dividers>
                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                value={empNameEdit}
                                                required
                                                fullWidth
                                                label="Name"
                                                onChange={(e) => setEmpNameEdit(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                value={empAddressEdit}
                                                fullWidth
                                                label="Address"
                                                onChange={(e) => setEmpAddressEdit(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                value={empEmailIdEdit}
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                onChange={(e) => setEmpEmailIdEdit(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                value={passwordEdit}
                                                required
                                                fullWidth
                                                label="Password"
                                                type="password"
                                                onChange={(e) => setPasswordEdit(e.target.value)}

                                            />
                                        </Grid>

                                    </Grid>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleEditClose} style={{ backgroundColor: "#e1d7d7", color: "#485467", fontWeight: "700" }}>
                                    Cancel
                                </Button>
                                <Button sx={{
                                    backgroundColor: disableEdit ? '#D3D3D3' : '#A1DD70',
                                    color: disableEdit ? '#A9A9A9' : '#006769',
                                    fontWeight: '700',
                                    '&:hover': {
                                        backgroundColor: disableEdit ? '#D3D3D3' : '#90C15C'
                                    }
                                }} disabled={disableEdit} onClick={handleEditEmp}>
                                    Save
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                </Box>}

                {opendeleteEmp && <Box>
                    <>
                        <Dialog
                            onClose={handleDeleteDialog}
                            aria-labelledby="customized-dialog-title"
                            open={opendeleteEmp}
                            maxWidth={"sm"}
                        >
                            <DialogTitle sx={{ m: 0, p: 2 }} className="tableHeader" id="customized-dialog-title">
                                Edit Organization
                            </DialogTitle>
                            <DialogContent dividers >
                                <Box component="form" noValidate sx={{ mt: 3 }}>
                                    Are you sure you want to delete this employee?
                                </Box>
                            </DialogContent>
                            <DialogActions >
                                <Button onClick={handleDeleteDialog} style={{ backgroundColor: "#e1d7d7", color: "#485467", fontWeight: "700" }}>
                                    Cancel
                                </Button>
                                <Button sx={{
                                    backgroundColor: '#B31312',
                                    color: '#FFFAE6',
                                    fontWeight: '700',
                                    '&:hover': {
                                        backgroundColor: '#FFFAE6',
                                        color: '#B31312'
                                    }
                                }} onClick={handleDeleteEmp}>
                                    Delete
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </>
                </Box>}

                {openSnack && <>
                    <Snackbar
                        open={openSnack}
                        autoHideDuration={3000}
                        onClose={handleSnack}
                        message={snacKMsg}
                        anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    />
                </>
                }
            {/* </Container > */}
        </>
    )
}