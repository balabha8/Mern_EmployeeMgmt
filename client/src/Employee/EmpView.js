import { useEffect, useState } from "react";
import { getEmpDetail } from "../Services/EmpService";
import { getOrgDetail, getOrgList } from "../Services/Orgservice";
import { Paper, Box, Container, Grid, List, ListItem, ListItemText } from '@mui/material';
import '../App.css';
import Dashboard from "../Dashboard/Dashboard";

export default function EmployeeView() {
    const [empDetail, setEmpDetail] = useState({});
    const [orgDetail, setOrgDetail] = useState([]);
    const employeeId = localStorage.getItem("empId");

    const fetchList = async () => {
        try {
            let resp = await getEmpDetail(employeeId);
            setEmpDetail(resp.result);
            if (resp) {
                let orgResp = await getOrgDetail(resp.result.organization);
                setOrgDetail(orgResp.result);
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchList()

    }, [])



    return (
        <>
            <Dashboard />
            <Container component="main" sx={{ width: '100vw', display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                    <Paper elevation={3} >
                        <Grid container spacing={2} style={{ width: "1100px" }}>
                            <Grid item xs={12}>
                                <List>
                                    <Grid container xs={12} >
                                        <Grid item xs={6} >
                                            <ListItem >
                                                <ListItemText primary="Name" secondary={empDetail.empName} />
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItem>
                                                <ListItemText primary="Mobile Number" secondary={empDetail.empMobileNUmber} />
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12}>
                                        <Grid item xs={6}>
                                            <ListItem>
                                                <ListItemText primary="Email Id" secondary={empDetail.empEmailId ? empDetail.empEmailId : "-"} />
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItem>
                                                <ListItemText primary="Address" secondary={empDetail.empAddress ? empDetail.empAddress : "-"} />
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12}>
                                        <Grid item xs={6}>
                                            <ListItem>
                                                <ListItemText primary="Role" secondary={empDetail.role} />
                                            </ListItem>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <ListItem>
                                                <ListItemText primary="Organization" secondary={orgDetail.orgName} />
                                            </ListItem>
                                        </Grid>
                                    </Grid>
                                </List>
                            </Grid>

                        </Grid>
                    </Paper>
                </Box>
            </Container >
        </>
    )
}