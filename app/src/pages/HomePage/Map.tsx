import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { searchFoodBanks } from '../../services/foodbank-service';
import { useDispatch, useSelector } from 'react-redux';
import { getAll, getByZipCode, loadMaps } from '../../store/foodBanks-slice';
import { AppDispatch } from '../../store';
import { FoodBank } from '../../models/Volunteer';
import { useTranslation } from 'react-i18next';
import './../dist/HomePage/main.css';

const GoogleMapComponent: React.FC<{ mapRef: React.RefObject<HTMLDivElement> }> = ({ mapRef }) => {
    const { t } = useTranslation();
    const [zipcode, setZipcode] = useState('');
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch<AppDispatch>();
    const fMap = useSelector(getAll())
    const fMap1 = useSelector(getByZipCode(zipcode))
    const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
    const [message, setMessage] = useState('')

    useEffect(() => {
        // Check if userLocation is set
        if (userLocation && map) {
            // Set map center to user's location
            map.setCenter(userLocation);
            getAllFoodBanks();
        }
    }, [userLocation, map]); // Re-run effect when userLocation or map changes

    // Call initMap when component mounts
    useEffect(() => {
        initMap();
        getUserLocation();
    }, []); // Empty dependency array ensures it runs only once after initial render

    const getAllFoodBanks = () => searchFoodBanks().then((foodBanks) => {
        dispatch(loadMaps(foodBanks));
        // Create markers for each food bank
        foodBanks.forEach((foodBank) => {
            // console.log(foodBank)
            const { name, address, contact } = foodBank;
            const { coordinates } = foodBank.location || {}; // Extract coordinates from food bank
            if (coordinates && coordinates.length === 2) { // Ensure valid coordinates
                const [longitude, latitude] = coordinates; // Extract longitude and latitude
                const marker = new google.maps.Marker({
                    position: { lat: latitude, lng: longitude }, // Set marker position
                    map: map, // Assign marker to the map
                    title: foodBank.name, // Set marker title
                });

                // Create content for the info window
                const contentString = `
        <div>
            <h2>${name}</h2>
            <p><strong>Address:</strong> ${address.street}, ${address.city} ${address.state ? ',' + address.state : ''} ${address.zip_code ? ',' + address.zip_code : ''}</p>
            <p><strong>Contact:</strong> ${contact.phone}</p>
        </div>
    `;

                // Create info window
                const infowindow = new google.maps.InfoWindow({
                    content: contentString, // Set content for the info window
                });

                // Attach event listener to marker to open info window when clicked
                marker.addListener('click', () => {
                    infowindow.open(map, marker); // Open info window
                    console.log('test')
                });
            }
        });
    })
    // Function to handle user location retrieval
    function getUserLocation() {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLocation = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };
            setUserLocation(userLocation);
        });
    }

    // Function to initialize map and set map object to state
    function initMap() {
        const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 0, lng: 0 }, // Default center
            zoom: 10,
        });
        setMap(mapInstance);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!map || !zipcode) return; // Map not initialized or zip code not entered

        // Geocode the entered zip code to get its coordinates
        const geocoder = new google.maps.Geocoder();

        if (!fMap1 || !fMap1[0]) {
            // setMessage('Unable to find a food bank near your zip code')
            geocoder.geocode({ address: zipcode }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    const location = results[0].geometry.location;
                    // Set the map center to the coordinates of the zip code
                    map.setCenter(location);
                    setError(null); // Clear any previous errors
                } else {
                    // If geocoding fails, display an error message
                    setError('Geocode was not successful. Please enter a valid zip code.');
                    console.error('Geocoding failed:', status);
                }
            })
            return
        }
        setMessage('')
        const { coordinates } = fMap1[0].location || {};
        if (coordinates && coordinates.length === 2) {
            const [longitude, latitude] = coordinates;
            geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
                if (status === 'OK' && results && results[0]) {
                    const location = results[0].geometry.location;
                    // Set the map center to the coordinates of the zip code
                    map.setCenter(location);
                    setError(null); // Clear any previous errors
                } else {
                    // If geocoding fails, display an error message
                    setError('Geocode was not successful. Please enter a valid zip code.');
                    console.error('Geocoding failed:', status);
                }
            })
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setZipcode(event.target.value);
    };

    return (
        <div className="google-map-container">
            {/* Left side - Text field for searching food banks */}
            <div className="left-side">
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="zipcode"
                        label={t('map.enterZipCode.label')}
                        variant="outlined"
                        value={zipcode}
                        onChange={handleInputChange}
                        required
                        fullWidth
                    />
                    <Button type="submit" variant="contained" color="primary" style={{ marginTop: '10px' }}>{t('map.findFoodBank.button')}</Button>
                </form>
                {/* Display error message if any */}
                {error && <p className="error-message">{error}</p>}
                {message && <p className="error-message">{message}</p>}
            </div>
            {/* Right side - Map container */}
            {!userLocation && <Typography sx={{ textAlign: 'center' }}>loading...</Typography>}
            <div className="right-side" ref={mapRef}></div>
        </div>
    );
};

export default GoogleMapComponent;
