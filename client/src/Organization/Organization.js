import { useEffect, useState } from "react";
import { getOrgList, AddOrg, EditOrg, DeleteOrg } from "../Services/Orgservice";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Snackbar, Paper, TextField, FormControlLabel, Box, IconButton, Container, Fab, Grid, Dialog, DialogContent, DialogActions, DialogTitle, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";

import variables from "../Common";
import '../App.css';
import Dashboard from "../Dashboard/Dashboard";

export default function Organization() {
    const [orgList, setOrgList] = useState([]);
    const [openAddOrg, setOpenAddOrg] = useState(false);
    const [openEditOrg, setOpenEditOrg] = useState(false);
    const [opendeleteOrg, setOpenDelete] = useState(false);

    const [orgName, setOrgName] = useState("");
    const [orgAddress, setOrgAddress] = useState("");
    const [orgContactNum, setOrgContactNum] = useState("");
    const [orgEmailId, setOrgEmailId] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [snacKMsg, setSnacKMsg] = useState("");
    const disableAdd = !orgName || !orgAddress || !orgContactNum || orgContactNum.length !== 10;

    const [selectedRow, setSelectedRow] = useState({});
    const [orgNameEdit, setOrgNameEdit] = useState("");
    const [orgAddressEdit, setOrgAddressEdit] = useState("");
    const [orgContactNumEdit, setOrgContactNumEdit] = useState("");
    const [orgEmailIdEdit, setOrgEmailIdEdit] = useState("");
    const disableEdit = !orgNameEdit || !orgAddressEdit;

    const [selectedOrgId, setSelectedOrgId] = useState("");

    const fetchList = async () => {
        try {
            let resp = await getOrgList();
            setOrgList(resp.result);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchList()

    }, [])

    useEffect(() => {
        if (selectedRow) {
            setOrgNameEdit(selectedRow.orgName);
            setOrgAddressEdit(selectedRow.orgAddress);
            setOrgContactNumEdit(selectedRow.orgContactNum);
            setOrgEmailIdEdit(selectedRow.orgEmailId)
        }
    }, [selectedRow]);

    const openAddDialog = () => {
        setOpenAddOrg(true);
    }

    const handleClose = () => {
        setOpenAddOrg(false);
    }

    const handleEditClose = () => {
        setOpenEditOrg(false);
    }

    // const handleEdit = () => {
    //     setOpenEditOrg(false);
    // }

    const handleDeleteDialog = () => {
        setOpenDelete(false);
    }

    const handleSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    const handleAddOrg = async () => {
        try {
            let orgDetails = {
                orgName, orgAddress, orgContactNum, orgEmailId
            }
            let resp = await AddOrg(orgDetails);
            if (resp.status === "Success") {
                setOpenSnack(true);
                resetFields();
                handleClose();
                setSnacKMsg("Organization added successfully");
                fetchList();
            }
        } catch (e) {
            console.log(e)
            setOpenSnack(true);
            setSnacKMsg("Failed to add organization");
        }

    }

    const handleEditOrg = async (org) => {
        try {
            setSelectedOrgId(selectedRow._id);
            let orgDetails = {
                orgName: orgNameEdit,
                orgAddress: orgAddressEdit,
                orgEmailId: orgEmailIdEdit
            }
            let resp = await EditOrg(selectedRow._id, orgDetails);
            if (resp.status === "Success") {
                setOpenSnack(true);
                setOpenEditOrg(false);
                setSnacKMsg("Organization updated successfully");
                fetchList();
            }
        } catch (e) {
            console.log(e)
            setOpenSnack(true);
            setSnacKMsg("Failed to save details of organization");
        }

    }

    const handleDeleteOrg = async () => {
        try {
            let resp = await DeleteOrg(selectedOrgId);
            if (resp.status === "Success") {
                setOpenSnack(true);
                handleDeleteDialog();
                setSnacKMsg("Organization deleted successfully");
                fetchList();
            }
        } catch (e) {
            console.log(e)
            setOpenSnack(true);
            setSnacKMsg("Failed to delete organization");
        }

    }

    const resetFields = () => {
        setOrgAddress(""); setOrgContactNum(""); setOrgName("")
    }

    const handleRowClick = (org) => {
        setSelectedRow(org);
        setOpenEditOrg(true);
    }

    const handleDelete = (org) => {
        setSelectedOrgId(org._id);
        setOpenDelete(true);
    }

    return (
        <>
            <Dashboard />
            {/* <Container component="main" sx={{ width: '100vw', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}> */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginLeft: "30px", marginRight: "30px" }}>
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
                                            {variables.ORG_HEADERS.map((org, index) => (
                                                <TableCell sx={{ color: "#091040", textAlign: "center", fontWeight: "700" }} key={index}>{org.header}</TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {orgList.map((org, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            // onClick={() => handleRowClick(org)}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {org.orgName}
                                                </TableCell>
                                                <TableCell align="center">{org.orgContactNum}</TableCell>
                                                <TableCell align="center">{org.orgEmailId ? org.orgEmailId : "-"}</TableCell>
                                                <TableCell align="center">{org.orgAddress}</TableCell>
                                                <TableCell align="center"><EditIcon onClick={() => handleRowClick(org)} /></TableCell>
                                                <TableCell align="center"><DeleteIcon onClick={() => handleDelete(org)} /></TableCell>


                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            {openAddOrg && <Box>
                <>
                    <Dialog
                        onClose={handleClose}
                        aria-labelledby="customized-dialog-title"
                        open={openAddOrg}
                        maxWidth={"md"}
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} className="tableHeader" id="customized-dialog-title">
                            Add Organization
                        </DialogTitle>
                        <DialogContent dividers>
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Organization Name"
                                            onChange={(e) => setOrgName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Organization Address"
                                            onChange={(e) => setOrgAddress(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            onChange={(e) => setOrgEmailId(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Contact Number"
                                            onChange={(e) => setOrgContactNum(e.target.value)}
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
                            }} disabled={disableAdd} onClick={handleAddOrg}>
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            </Box>}

            {openEditOrg && <Box>
                <>
                    <Dialog
                        onClose={handleEditClose}
                        aria-labelledby="customized-dialog-title"
                        open={openEditOrg}
                        maxWidth={"md"}
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} className="tableHeader" id="customized-dialog-title">
                            Edit Organization
                        </DialogTitle>
                        <DialogContent dividers>
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            value={orgNameEdit}
                                            required
                                            fullWidth
                                            label="Organization Name"
                                            onChange={(e) => setOrgNameEdit(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            value={orgAddressEdit}
                                            required
                                            fullWidth
                                            label="Organization Address"
                                            onChange={(e) => setOrgAddressEdit(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            value={orgEmailIdEdit}
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            onChange={(e) => setOrgEmailIdEdit(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            value={orgContactNumEdit}
                                            required
                                            fullWidth
                                            label="Contact Number"
                                            disabled
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
                            }} disabled={disableEdit} onClick={handleEditOrg}>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog>
                </>
            </Box>}

            {opendeleteOrg && <Box>
                <>
                    <Dialog
                        onClose={handleDeleteDialog}
                        aria-labelledby="customized-dialog-title"
                        open={opendeleteOrg}
                        maxWidth={"sm"}
                    >
                        <DialogTitle sx={{ m: 0, p: 2 }} className="tableHeader" id="customized-dialog-title">
                            Edit Organization
                        </DialogTitle>
                        <DialogContent dividers >
                            <Box component="form" noValidate sx={{ mt: 3 }}>
                                Are you sure you want to delete this organization?
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
                            }} onClick={handleDeleteOrg}>
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
            {/* </Container> */}
        </>
    )
}