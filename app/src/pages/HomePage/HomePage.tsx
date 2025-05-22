/**
 * Homepage component for the application.
 * Renders the main content of the homepage including user stories, our work section, donation section, and Google Map.
 * @component
 */
import React, { useRef } from 'react';
import UserStoriesList from './UserStoriesList';
import OurWorkSection from './OurWork';
import DonateSection from './Section';
import GoogleMapComponent from './Map';
import { useTranslation } from 'react-i18next';
import NavBar from './NavBar';
import './../dist/HomePage/main.css';

/**
 * Functional component representing the homepage of the application.
 * 
 */
const HomePage: React.FC = () => {
  // Reference for the Google Map component
  const mapRef = useRef<HTMLDivElement>(null);
  // Translation hook for localization
  const { t } = useTranslation();

  // Array containing work stories with image, title, and content
  const workStories = [
    {
      image: 'src/pages/HomePage/images/d.png',
      title: t('homepage.section1.title'),
      content: t('homepage.section1.content'),
    },
    {
      image: 'src/pages/HomePage/images/v.png',
      title: t('homepage.section2.title'),
      content: t('homepage.section2.content'),
    },
    {
      image: 'src/pages/HomePage/images/fb.png',
      title: t('homepage.section3.title'),
      content: t('homepage.section3.content'),
    },
  ];

  return (
    <>
      {/* Navigation bar */}
      <NavBar mapRef={mapRef} />
      {/* List of user stories */}
      <UserStoriesList />
      {/* Donation section */}
      <DonateSection mapRef={mapRef} />
      <div className="App">
        {/* Our work section */}
        <OurWorkSection stories={workStories} />
      </div>
      {/* Google Map component */}
      <GoogleMapComponent mapRef={mapRef} />
    </>
  );
}

export default HomePage;
