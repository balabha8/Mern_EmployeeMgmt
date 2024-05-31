import React from 'react';
import { TextField, Button, Box, Grid, Link, Paper, Typography, Avatar, Container, CssBaseline } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import image from '../assets/background.png';
// import '../styles/LoginPageStyle.css';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { login } from '../Services/Auth';
// import AuthService from '../services/AuthService';

export default function SignIn() {
    const navigate = useNavigate();

    const numberValidation = /^\d{10}$/;
    const [errorText, seterrorText] = useState('');
    const [empMobileNUmber, setMobileNumber] = useState('');
    const [password, setPassword] = useState("");
    const [userData, setuserData] = useState({});
    const [isValid, setisValid] = useState(false);
    const disableLogin = !empMobileNUmber || !password;


    const handleError = (event) => {
        let contactInfo = event.target.value;
        if (!contactInfo) {
            seterrorText("This field is mandatory.")
        } else if (!contactInfo.match(numberValidation)) {
            seterrorText("Please enter valid mobile number.")
        } else {
            seterrorText("");
            setMobileNumber(contactInfo);
            setisValid(true);
        }

    }

    const handleLogin = async () => {
        try {
            const data = {
                empMobileNUmber: empMobileNUmber,
                password: password
            }
            let resp = await login(data)
            if (resp) {
                localStorage.setItem("empId", resp._id);
                localStorage.setItem("role", resp.role);

                navigate('/dashboard')
            }
        } catch (e) {
            console.log(e)
        }


    };

    return (
        // <Grid container component="main" sx={{ height: '100vh' }}>

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
                <Typography component="h1" variant="h4">
                    Sign In
                </Typography>
                <Box  sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="mobileNumber"
                        label="Mobile Number"
                        name="mobileNumber"
                        onChange={handleError}
                        autoFocus
                        helperText={errorText}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        color='primary'
                        disabled={disableLogin}
                        onClick={handleLogin}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent="center">
                        <Grid item >
                            <div>
                                Don't have an account?
                                <Link
                                    component="button"
                                    variant="body2"
                                    onClick={() => {
                                        navigate('/signup')
                                    }}
                                >
                                    Sign Up
                                </Link>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>

    )
}
