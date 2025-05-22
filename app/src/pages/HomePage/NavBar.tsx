import React, { useEffect } from 'react';
import { AppBar, Toolbar, Button, Typography, Container, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AccountCircle } from '@mui/icons-material';
import './../dist/HomePage/main.css';
import { searchUser, updateUser, deleteUser, getAuthTokenCookie } from '../../services/user-service';
import { User } from "../../models/User";
import { getUser, saveForm } from '../../store/users-slice';
import { useDispatch, useSelector } from 'react-redux';
interface NavBarProps {
    mapRef: React.RefObject<HTMLDivElement>; // Define the prop for mapRef
    // isLoggedIn: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ mapRef/* , isLoggedIn */ }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openDialog, setOpenDialog] = React.useState(false);
    const [openUpdateDialog, setOpenUpdateDialog] = React.useState(false); // State for update profile dialog
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [id, setId] = React.useState('');
    const [del, setDel] = React.useState(false);
    const dispatch = useDispatch();
    const userData = useSelector(getUser())


    // useEffect(() => {
    //     const authToken = getAuthTokenCookie('authToken');
    //     if (authToken) {
    //         console.log('Auth token:', authToken);
    //     } else {
    //         console.log('Auth token not found');
    //     }
    // })
    /**
     * Scrolls to the map section.
     */
    const scrollToMap = () => {
        if (mapRef.current) {
            mapRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language); // Function to change language
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleUpdateProfile = () => {
        // Navigate to the update profile page
        setOpenUpdateDialog(true);
        handleMenuClose();
    };

    const handleDeleteProfile = () => {
        // Perform deletion logic here
        // For example, you can show a confirmation dialog before deleting
        setOpenDialog(true)
        console.log(userData.user)
        if (userData.user[0]?.id) {
            deleteUser(userData.user[0].id).then(res => console.log(res)).catch(e => console.log(e))
        }
        handleMenuClose();
    };

    const handleConfirmDelete = () => {
        // Perform deletion logic here
        // For now, just close the dialog
        setDel(true)
        setOpenDialog(false);
    };

    const handleConfirmUpdate = () => {
        // Perform update logic here
        // For now, just close the dialog
        setOpenUpdateDialog(false);
        searchUser(email, '').then((res) => {
            console.log(res);
            if (!res) return;
            dispatch(saveForm({ user: res }))
            setId(res?.id ? res?.id : '')
        })
    };

    useEffect(() => {
        console.log(userData)
        // console.log('id = ', userData.user[0]?.id)
        // setId(userData);
        const data: User = {
            firstName: firstName, lastName: lastName, password: newPassword, email: email
        };
        updateUser(id, data).then(res2 => {
            console.log(res2)
        }).catch(e => console.log(e))
    }, [userData])

    const handleCloseUpdateDialog = () => {
        setOpenUpdateDialog(false);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <div>
            {/* Navigation bar */}
            <AppBar position="static" className="navbar">
                <Container>
                    {/* Toolbar */}
                    <Toolbar className="navbar-toolbar">
                        {/* Logo */}
                        <Typography variant="h6" component="div" className="navbar-title">
                            <img src="src/pages/HomePage/images/logo-no-background.png" alt="logo" width={'100px'} height={'100px'} />
                        </Typography>
                        {/* Navigation buttons */}
                        <div className="navbar-buttons">
                            {/* Scroll to map button */}
                            <Button color="inherit" className="navbar-button" onClick={scrollToMap}>{t('navbar.button.label')}</Button>
                            {/* Volunteer button */}
                            <Button color="inherit" className="navbar-button" onClick={() => navigate('/volunteer')}>{t('navbar.button.volunteer')}</Button>
                            {/* Donate button */}
                            <Button color="inherit" className="navbar-button" onClick={() => navigate('/donate')}>{t('navbar.button.donate')}</Button>
                            {/* Signup button */}
                            <Button color="inherit" className="navbar-button" onClick={() => navigate('/signup')}>{t('navbar.button.signup')}</Button>
                            {/* {isLoggedIn ? ( // Conditionally render profile section if user is logged in */}
                            {!del && <>
                                <IconButton
                                    color="inherit"
                                    className="navbar-button"
                                    onClick={handleMenuOpen}
                                    aria-controls="profile-menu"
                                    aria-haspopup="true"
                                >
                                    <AccountCircle /> {/* Replace "Profile" button text with AccountCircle icon */}
                                </IconButton>
                                <Menu
                                    id="profile-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleMenuClose}
                                >
                                    <MenuItem onClick={handleUpdateProfile}>Update Profile</MenuItem>
                                    <MenuItem onClick={handleDeleteProfile}>Delete Profile</MenuItem>
                                </Menu>
                            </>}
                            {/* ) : null}                        */}
                        </div>
                        <div className="navbar-button">
                            {/* Language dropdown */}
                            <select onChange={(e) => changeLanguage(e.target.value)} value={i18n.language}>
                                <option value="en">English</option>
                                <option value="hi">हिन्दी</option>
                                <option value="th">ไทย</option>
                            </select>
                        </div>
                    </Toolbar>
                </Container>
            </AppBar>
            <br />
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">Are you sure you want to delete your profile?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmDelete} color="primary" autoFocus>Confirm</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openUpdateDialog} onClose={handleCloseUpdateDialog}>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="First Name"
                        fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="Last Name"
                        fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="oldPassword"
                        label="Old Password"
                        type="password"
                        fullWidth
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="newPassword"
                        label="New Password"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUpdateDialog} color="primary">Cancel</Button>
                    <Button onClick={handleConfirmUpdate} color="primary" autoFocus>Update</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default NavBar;
