import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Login.css'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, loginFailure, loginRequest, loginSuccess } from '../../store/users-slice'
import { searchUser } from '../../services/user-service';
import { useNavigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import { validateEmail, validatePassword } from '../../services/validation-service';

const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector(getUser())

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [formErrors, setFormErrors] = useState({
    email: "",
    password: "",
    both: ""
  });

  const onChange = (event: React.ChangeEvent<{ name: string, value: any }>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value })
    // Validate the input field and update formErrors state
    if (name === 'email') {
      setFormErrors({ ...formErrors, email: validateEmail(value) });
    } else if (name === 'password') {
      setFormErrors({ ...formErrors, password: validatePassword(value) });
    }
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const updatedFormErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      both: formErrors.both
    };
    setFormErrors(updatedFormErrors);
    if (!Object.values(updatedFormErrors).some(error => error)) {
      dispatch(loginRequest());
      searchUser(formData.email, formData.password).then(result => {
        if (result?.length > 0) {
          dispatch(loginSuccess(result))
          navigate('/');
        } else {
          const failString = 'Please check your username and password.'
          setFormErrors({ ...formErrors, ['both']: failString })
          dispatch(loginFailure(failString))
        }
      }).catch((e) => { dispatch(loginFailure(e)) })
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box className="background">
      <Grid container component="main" className="containerL">
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square className="paper">
          <Box className="paper-content">
            <Avatar className="avatar">
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color='white'>
              Sign in
            </Typography>
              {userState && userState.loading && <CircularProgress />}
            <Box component="form" onSubmit={handleSubmit} className="form">
              <Typography sx={{ color: red }}>{formErrors.both ? formErrors.both : null}</Typography>
              <TextField
                className='text'
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                error={formErrors.email != ''}
                helperText={formErrors.email ? formErrors.email : null}
                onChange={onChange}
              />
              <TextField
                className='text'
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                error={formErrors.password != ''}
                helperText={formErrors.password ? formErrors.password : null}
                onChange={onChange}
                autoComplete="current-password"
              />
              <FormControlLabel
                sx={{color:'white'}}
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                className="submit"
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" className="link" sx={{color:'white'}}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2" className="link" sx={{color:'white'}}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Box>
    </ThemeProvider>
  );
}
