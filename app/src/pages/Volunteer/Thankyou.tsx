import React, { useRef } from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import './Volunteer.css'
import NavBar from '../HomePage/NavBar';

/**
 * ThankYouPage component to display a thank you message after user registration.
 * 
 * 
 */
const ThankYouPage: React.FC = () => {
    /**
     * Reference to the map div element.
     * 
     * @type {React.MutableRefObject<HTMLDivElement | null>}
     */
    const mapRef = useRef<HTMLDivElement>(null);

    return (
        <>
            {/* Render NavBar component with mapRef prop */}
            <NavBar mapRef={mapRef}></NavBar>
            {/* Container to hold thank you message */}
            <Container maxWidth="md" style={{ marginTop: '50px', marginBottom: '50px' }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Thank You for Registering!
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    We appreciate your willingness to volunteer and make a difference in our community.
                </Typography>
                <Typography variant="body1" align="center" paragraph>
                    You'll receive a confirmation email shortly with further details.
                </Typography>
                {/* Button to navigate back to homepage */}
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button component={Link} to="/" variant="contained">
                        Go Back to Homepage
                    </Button>
                </div>
            </Container>
        </>
    );
};

export default ThankYouPage;
