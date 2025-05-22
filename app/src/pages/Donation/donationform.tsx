
import React, { FormEvent, useState } from 'react';
import { AppBar, Toolbar, Button, Typography, Container, IconButton, FormControl, Avatar } from '@mui/material';
import {
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  TextField,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import './donation.css'; // Import the external CSS file
import backgroundImage from './Images/Charity2.jpg'; // Import the background image
import { postDonation } from '../../services/donationform-service'; //// Import postDonation function
import { Donation } from '../../models/donation'; //// Import Donation model





const DonationForm = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [amount, setAmount] = useState(''); // Default amount
  const [otherAmount, setOtherAmount] = useState('');
  const [pay, setPay] = useState(false);
  const [formData, setFormData] = useState<Donation>({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    zip_code: '',
    email: '',
    cardNumber: '',
    cvv: '',
    expiry: '',
    amount: '10',
    honor: ''
  })

  const [showDialog, setShowDialog] = useState(false);
  // radio buttons for donation amount
  
  const handleAmountChange = (e) => {
    console.log('amount: ', e.target.value)
    // other
    setAmount(e.target.value);
    if (e.target.value === 'other') {
      return;
    }
    setFormData({ ...formData, amount: e.target.value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    postDonation(formData);
    setShowDialog(true); // Show the dialog box upon form submission
  };

 

  // handler input change
  const handleInputChange = (e) => {
    if (e.target.name === 'amount' && amount === 'other') {
      setOtherAmount(e.target.value);
    }
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleDialogClose = () => {
    setShowDialog(false);
  };

  return (
// Background image
    <div className="background-container">
      <img src={backgroundImage} alt="Background" className="background-image" />
      <Grid container justifyContent="left" alignItems="center" style={{ position: 'relative' }}>
        <AppBar position="absolute" className="nav-bar">
          <Container>
            <Toolbar className="appbar">
              <Typography variant="h6" component="div" className="appbar">
                <img src="src/pages/HomePage/images/logo-no-background.png" alt="logo" width={'100px'} height={'100px'} />
              </Typography>
              <div className="scrolling-text">Help Us End Hunger Today!</div>
            </Toolbar>
          </Container>
        </AppBar>
        <br />
        <form onSubmit={handleSubmit} className="donation-form">
          <FormControl component="fieldset" fullWidth >
            <FormLabel className="donation" component="legend">Donation Frequency</FormLabel>
            <RadioGroup
              className='Radio-text'
              row
              value={isMonthly ? 'monthly' : 'one-time'}
              onChange={(e) => setIsMonthly(e.target.value === 'monthly')}
            >
              <FormControlLabel value="monthly" control={<Radio />} label="Monthly" />
              <FormControlLabel value="one-time" control={<Radio />} label="One-Time" />
            </RadioGroup>
          </FormControl>
          
          <FormControl component="fieldset" fullWidth>
            <FormLabel className="donation" component="legend">Donation Amount</FormLabel>
            <RadioGroup className='Radio-text' row value={amount} onChange={handleAmountChange}>
              <FormControlLabel value="10" control={<Radio />} label="$10" />
              <FormControlLabel value="20" control={<Radio />} label="$20" />
              <FormControlLabel value="50" control={<Radio />} label="$50" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
            {amount === 'other' && (
              <TextField
                value={otherAmount}
                name='amount'
                onChange={handleInputChange}
                label="Enter amount"
                // type="number"
                fullWidth
                className='entertext'
              />
            )}
          </FormControl>
          {/* In honor or in memory of */}
          <TextField
            value={formData.honor}
            name='honor'
            onChange={handleInputChange}
            label="In honor or in memory of"
            fullWidth
            className="honor-textfield"
          />

          {!pay ? (
            <Button
              variant="contained"
              onClick={() => {
                setPay(true);
              }}
              fullWidth
              className="donate-button"
            >
              PAY with Card
            </Button>
          )
            : (
              <div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  {/* // for last name */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  {/* for card number */}
                  <Grid item xs={12}>
                    <TextField
                      label="Card Number"
                      name='cardNumber'
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      inputProps={{ maxLength: 16 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  {/* for CVV number */}
                  <Grid item xs={6}>
                    <TextField
                      label="CVV"
                      name='cvv'
                      value={formData.cvv}
                      onChange={handleInputChange}
                      inputProps={{ maxLength: 3 }}
                      fullWidth
                      required
                      type='password'
                    />
                    {/* Expiry date */}
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label="YY/MM"
                      name='expiry'
                      value={formData.expiry}
                      onChange={handleInputChange}
                      inputProps={{ maxLength: 4 }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="City"
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="State"
                      name='state'
                      value={formData.state}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Zip"
                      name='zip_code'
                      value={formData.zip_code}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Email"
                      type="email"
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      fullWidth
                      required
                    />
                  </Grid>
                </Grid>

                <div className="payment-options">
                  <a href="https://www.paypal.com" target="_blank" rel="noopener noreferrer">
                    <img src="https://www.1min30.com/logo/wp-content/uploads/2017/09/Paypal-logo.jpg" alt="PayPal" className="payment-logoP" />
                  </a>
                  <a href="https://www.apple.com/apple-pay/" target="_blank" rel="noopener noreferrer">
                    <img src="https://artifexnet.com/gr/wp-content/uploads/sites/9/2019/09/apple-pay-official-logo-card-icon-1140x730.png" alt="ApplePay" className="payment-logoA" />
                  </a>
                </div>
                <Button
                  variant="contained"
                  className="submit-button"
                  type='submit'
                >
                  Confirm
                </Button>

                <Button

                  onClick={() => {
                    setPay(false);
                  }}
                  className="cancel-button"
                >
                  Cancel
                </Button>

              </div>
            )}
        </form>

        
      {/* Dialog box for showing the confirmation message */}
      <Dialog open={showDialog} onClose={handleDialogClose}>
          <DialogTitle>Thank you for your kind donation towards feeding the hungry and needy.</DialogTitle>
          <DialogContent>
            {/* You can add additional content here if needed */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary" autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    

      
    </div>

    
  );
};

// Export the DonationForm component
export default DonationForm;
