import * as React from 'react';
import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Outlet, useNavigate } from 'react-router-dom';
const drawerWidth = 240;


export default function Dashboard(props) {
    const navigate = useNavigate();
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [role, setRole] = React.useState(localStorage.getItem("role"));


    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const handleLogout = async () => {
        localStorage.clear()
        navigate('/signin')
    }

    const navItems = [
        { text: 'Organization', path: '/organization' },
        { text: 'Employees', path: '/employees' },
        { text: 'Account', path: '/account' },
        { text: 'Logout', onClick: handleLogout }
    ];

    const filteredNavItems = role === 'Admin' ? navItems : navItems.filter(item => item.text === 'Account' || item.text === 'Logout');


    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                ASSESS
            </Typography>
            <Divider />
            <List>
                {filteredNavItems.map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton
                            component={item.onClick ? 'button' : Link}
                            to={item.path}
                            sx={{ textAlign: 'center' }}
                            onClick={item.onClick}
                        >
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    const mainContent = (
        <Box component="main" sx={{ p: 3 }}>
            <Toolbar />
            <Outlet />
        </Box>
    );

    return (
        // <Router>
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        ASSESS
                    </Typography>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {filteredNavItems.map((item) => (
                            <Button key={item.text} component={Link} to={item.path} sx={{ color: '#fff' }}>
                                {item.text}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true,
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
            <Box component="main" sx={{ p: 3 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}
