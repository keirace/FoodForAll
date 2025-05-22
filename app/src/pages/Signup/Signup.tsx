import * as React from 'react';
import Avatar from '@mui/material/Avatar';
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
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './Signup.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupRequest, UserState, getUser, saveForm, signupFailure, signupSuccess } from '../../store/users-slice';
import { postUser } from '../../services/user-service'
import { Navigate, useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../services/validation-service';

const defaultTheme = createTheme();

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector(getUser())
  // if(userState.user) {
  //   navigate('/donate')
  // }
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  })
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const onChange = (event: React.ChangeEvent<{ name: string, value: string }>) => {
    const { name, value } = event.target;
    // dispatch(saveForm({ ...formData, [name]: value }))
    setFormData({ ...formData, [name]: value })
    // const validationErrors = validate({ ...formData, [name]: value });
    // setFormErrors(validationErrors);
    // Validate the input field and update formErrors state
    let val;
    if (name === 'email') {
      val = validateEmail(value)
    } else if (name === 'password') {
      val = validatePassword(value)
    } else {
      val = validate(name, value)
    }
    setFormErrors({ ...formErrors, [name]: val })
  }

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const updatedFormErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      firstName: validate('firstName', formData.firstName),
      lastName: validate('lastName', formData.lastName)
    };
    setFormErrors(updatedFormErrors);

    // Proceed with form submission if there are no errors
    if (!Object.values(updatedFormErrors).some(error => error)) {
      dispatch(signupRequest());
      postUser(formData).then(result => {
        if (result.id) {
          dispatch(signupSuccess(result))
          navigate('/login');
        } else {
          dispatch(signupFailure(result.message));
          setFormErrors({ ...formErrors, ['email']: result.message });
        }
      }).catch((e) => { console.log(e); dispatch(signupFailure(e)); })
    }
  };

  const validate = (name: string, value: string | null) => {
    if (!value) {
      return (name === 'firstName' ? 'First' : 'Last') + " name is required!";
    }
    return '';
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box className="background">
        <Container component="main" maxWidth="xs" className="container">
          <Box className="box">
            <Avatar className="avatar" >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" sx={{ color: 'white' }}>
              Sign up
            </Typography>
            {userState && userState.loading && <CircularProgress />}
            <Box component="form" onSubmit={handleSubmit} className="form">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    className='Text'
                    // required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    error={formErrors.firstName != ''}
                    helperText={formErrors.firstName ? formErrors.firstName : null}
                    value={formData.firstName}
                    autoFocus
                    onChange={onChange}
                  />
                  {/* <Typography className="error-message">{formErrors.firstName}</Typography> */}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className='Text'
                    // required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    error={formErrors.lastName != ''}
                    helperText={formErrors.lastName ? formErrors.lastName : null}
                    autoComplete="family-name"
                    onChange={onChange}
                  />

                  {/* <Typography className="error-message">{formErrors.lastName}</Typography> */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className='Text'
                    // required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={formData.email}
                    autoComplete="email"
                    error={formErrors.email != ''}
                    helperText={formErrors.email ? formErrors.email : null}
                    onChange={onChange}
                  />
                  {/* <Typography className="error-message">{formErrors.email}</Typography> */}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    // required
                    className='Text'
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    value={formData.password}
                    autoComplete="new-password"
                    error={formErrors.password != ''}
                    helperText={formErrors.password ? formErrors.password : null}
                    onChange={onChange}
                  />
                  {/* <Typography className="error-message">{formErrors.password}</Typography> */}
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" sx={{ color: 'white' }} />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    name="allowExtraEmails"
                    sx={{ color: 'white' }}
                  />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" className='submit-btn'>
                Sign Up
              </Button>
            </Box>

            <Grid container justifyContent="flex-end">
              <Grid item >
                <Link href="/login" variant="body2" className="link" sx={{ color: 'white' }}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
}