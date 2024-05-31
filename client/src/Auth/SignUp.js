import { useState, useEffect } from 'react';
import { Avatar, Snackbar, Select, InputLabel, MenuItem } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getOrgList } from '../Services/Orgservice';
import { AddEmp, getEmpList, getEmpListByFilter } from '../Services/EmpService';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const navigate = useNavigate();

    const [orgList, setOrgList] = useState([]);
    const [organization, setOrganization] = useState("");
    const [organizationId, setOrganizationId] = useState("")
    const [empName, setEmpName] = useState("");
    const [empAddress, setEmpAddress] = useState("");
    const [empMobileNUmber, setEmpMobileNUmber] = useState("");
    const [empEmailId, setEmpEmailId] = useState("");
    const [password, setPassword] = useState("");
    const [openSnack, setOpenSnack] = useState(false);
    const [snacKMsg, setSnacKMsg] = useState("");
    const numberValidation = /^\d{10}$/;
    const [errorText, seterrorText] = useState('');
    const [passwordErr, setpasswordError] = useState('');
    const disableAdd = !empName || !empMobileNUmber || empMobileNUmber.length !== 10 || !organizationId || !password || !passwordErr === "";




    const fetchList = async () => {
        try {
            let orgResp = await getOrgList();
            setOrgList(orgResp.result);
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        fetchList()

    }, [])

    const handleError = (event) => {
        let contactInfo = event.target.value;
        if (!contactInfo) {
            seterrorText("This field is mandatory.")
        } else if (!contactInfo.match(numberValidation)) {
            seterrorText("Please enter valid mobile number.")
        } else {
            seterrorText("");
            setEmpMobileNUmber(contactInfo);
            // setisValid(true);
        }

    }
    const handlePassError = (event) => {
        let passwrd = event.target.value;
        if (passwrd.length < 8) {
            setpasswordError("Password must be of length 8.")
        } else {
            setpasswordError("");
            setPassword(passwrd);
            // setisValid(true);
        }
    }


    const handleRegister = async () => {
        try {
            let empDetails = {
                empName, empAddress, empMobileNUmber, empEmailId, password, organization: organizationId, role: "User"
            }

            let duplicateFound = await getEmpListByFilter({ empMobileNUmber })
            if (duplicateFound.totalRecordCount > 0) {
                setOpenSnack(true);
                setSnacKMsg("Employee with this mobile number is already registered.");
            } else {
                let resp = await AddEmp(empDetails);
                if (resp.status === "Success") {
                    setOpenSnack(true);
                    setSnacKMsg("Registration successfull.");
                    navigate('/signin')
                }
            }
        } catch (e) {
            console.log(e)
            setOpenSnack(true);
            setSnacKMsg("Failed to register.");
        }

    }

    const handleSnack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnack(false);
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                onChange={(e) => setEmpName(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="mobileNumber"
                                label="Mobile Number"
                                name="mobileNumber"
                                onChange={handleError}
                                helperText={errorText}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={(e) => setEmpEmailId(e.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Address"
                                name="address"
                                onChange={(e) => setEmpAddress(e.target.value)}

                            />
                        </Grid>
                        <Grid item xs={12}>
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
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                onChange={(e) => handlePassError(e)}
                                helperText={passwordErr}

                            />
                        </Grid>
                    </Grid>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleRegister}
                        disabled={disableAdd}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => {
                                navigate('/')
                            }}>
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

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
        </Container>
        // </ThemeProvider>
    );
}