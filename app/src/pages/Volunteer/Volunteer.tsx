import { useState, FormEvent, FC, useRef } from 'react';
import { Box, Typography, Grid, Button, TextField, Paper, Collapse } from '@mui/material';
import VolunteerOpportunityCard from './VolunteerOpportunityCard'; // Create this component separately
import { VolunteerOpportunity } from '../../models/Volunteer';
import { useDispatch, useSelector } from 'react-redux';
import { postVolunteer } from '../../services/volunteerOpportunity-service';
import { saveForm, searchVolunteerOpportunities, signUpVolunteer, getVolunteerOpportunities, getStatus, getVolunteerId, getVolunteer, VolunteerState } from '../../store/volunteers-slice';
import { AppDispatch } from '../../store/index';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import './Volunteer.css'
import { validateEmail, validateZipCode } from '../../services/validation-service';

interface Errors {
  email: string;
  zip_code: string;
}

const initialErrors: Errors = {
  email: "",
  zip_code: ""
};

const VolunteerPage: FC = () => {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [expanded, setExpanded] = useState(false);
  const opportunitiesSectionRef = useRef<HTMLDivElement>(null);
  const status = useSelector(getStatus());
  const selectedOpportunityId = useSelector(getVolunteerId());
  const volunteerOpportunities = useSelector(getVolunteerOpportunities());
  const formData = useSelector(getVolunteer());
  const [errors, setErrors] = useState<Errors>(initialErrors);

  const handleInputChange = (event: React.ChangeEvent<{ name: string, value: any }>) => {
    const { name, value } = event.target;

    // Dispatch action to save form input changes
    dispatch(saveForm({ ...formData, [name]: value }))
    // Use the formData obtained from Redux state
    let val;
    if (name === 'email') {
      val = validateEmail(value)
    } else if (name === 'zip_code') {
      val = validateZipCode(value)
    }
    setErrors({ ...errors, [name]: val });
  }

  // get user information and search volunteer opportunities by zip code
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    // Proceed with form submission if there are no errors
    if (!Object.values(errors).some(error => error)) {
      setExpanded(true);

      // Dispatch action to search volunteer opportunities based on zip code;
      dispatch(searchVolunteerOpportunities(formData.zip_code))

      scrollToOpportunities();
    }
  };

  // post new volunteer data to mongo db
  const handleVolunteer = () => {
    if (selectedOpportunityId) {
      postVolunteer(formData);
      // After successful sign-up, redirect to the thank you page
      navigate('/thankyou');
    } else {
      alert('Please select a volunteer opportunity before signing up.');
    }
  };

  const handleCardClick = (opportunityId: string) => {
    if (opportunityId) {
      dispatch(signUpVolunteer({ opportunityId }));
    }
  };

  const scrollToOpportunities = () => {
    setTimeout(() => {
      opportunitiesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <Box className="form-wrapper">
        <Box className="form-body">
          <Typography variant="h3" gutterBottom>
            Find Opportunities Near You
          </Typography>
          <Typography variant="h5" gutterBottom>
            Make a difference in your community. Find volunteer opportunities at a food bank near you.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="First Name (Optional)"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Name (Optional)"
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Zip Code"
                  name='zip_code'
                  value={formData.zip_code}
                  type="number"
                  inputProps={{ min: 0 }}
                  onChange={handleInputChange}
                  error={errors.zip_code != ''}
                  helperText={errors.zip_code ? errors.zip_code : null}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  error={errors.email != ''}
                  helperText={errors.email ? errors.email : null}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth>
                  Find Opportunities
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
        <Box className="img-box">
          <Box component="img" src='https://cdn10.bostonmagazine.com/wp-content/uploads/sites/2/2018/11/volunteering-rosies-place-thumb.jpg' />
        </Box>
      </Box>

      <Box className="opportunities-wrapper">
        {/* How to section */}
        <Box className="opportunity-body">
          <Typography variant="h2" gutterBottom>
            How to volunteer
          </Typography>
          <Typography variant="h5" gutterBottom>
            It's easy to volunteer at a food bank! Here are three simple steps:
          </Typography>
          <Box className="opportunity-how-to">
            <Grid container spacing={3} sx={{ margin: '2rem' }}>
              <Grid item xs={12} md={4}>
                <Paper elevation={0}>
                  <Typography variant='h3' className='steps-label'>1</Typography>
                  <Typography>Find a food bank in your community</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0}>
                  <Typography variant='h3' className='steps-label'>2</Typography>
                  <Typography>Sign up for a volunteer shift</Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={0}>
                  <Typography variant='h3' className='steps-label'>3</Typography>
                  <Typography>Show up and have fun</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Opportunities section */}
        <div ref={opportunitiesSectionRef}>
          <Collapse sx={{ paddingTop: 10, paddingInline: 20 }} in={expanded} timeout="auto" unmountOnExit>
            <Box className="opportunity-body">
              <Typography variant="h2" gutterBottom>
                Your Matching Volunteer Opportunities
              </Typography>
              {/* Renders each card */}
              <Grid container spacing={3} sx={{ marginTop: '2rem' }}>
                {status === 'loading' && <Typography>Loading opportunities...</Typography>}
                {status === 'failed' && <Typography>Error fetching volunteer opportunities.</Typography>}
                {status === 'succeeded' && (volunteerOpportunities.length > 0) ? (volunteerOpportunities?.map((opportunity: VolunteerOpportunity) =>
                (<Grid item xs={12} sm={6} md={4} key={opportunity.id}>
                  <VolunteerOpportunityCard opportunity={opportunity}
                    isSelected={opportunity.id === selectedOpportunityId} // Check if selected
                    onClick={() => handleCardClick(opportunity.id)} />
                </Grid>
                ))) : <Typography>Sorry, we found no volunteer opportunities match your zip code...</Typography>}
              </Grid>
              {(volunteerOpportunities.length > 0) && (<Box className="volunteer-button">
                <Button variant="contained" onClick={() => handleVolunteer()}>Sign Up to Volunteer</Button>
              </Box>)}
            </Box>
          </Collapse>
        </div>
      </Box>
    </>
  );
};

export default VolunteerPage;
