/**
 * DonateSection Component
 * A component to display donation options including giving today, giving monthly,
 * finding a food bank, and volunteering.
 * @param mapRef RefObject<HTMLDivElement> Reference to the map component for scrolling
 */
import React from 'react';
import { Link } from 'react-router-dom';
import './../dist/HomePage/main.css'; // Main CSS file for HomePage
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

interface SectionProps {
    mapRef: React.RefObject<HTMLDivElement>; // Define the prop for mapRef
}

const DonateSection: React.FC<SectionProps> = ({ mapRef }) => {
    const { t } = useTranslation(); // Translation hook

    /**
     * Function to scroll to the map component
     */
    const scrollToMap = () => {
        if (mapRef.current) {
            mapRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="donate-section">
            {/* Link to donate page for giving today */}
            <Link to={'/donate'} className="donate-block">
                <div className="block-content">
                    <img src="src/pages/HomePage/images/donate.png" alt={t('donate.giveToday.title')} />
                    <h3>{t('donate.giveToday.title')}</h3>
                    <p>{t('donate.giveToday.description')}</p>
                </div>
                <div className="block-link">
                    <span>{t('donate.link.giveToday')}</span>
                </div>
            </Link>
            {/* Link to donate page for giving monthly */}
            <Link to={'/donate'} className="donate-block">
                <div className="block-content">
                    <img src="src/pages/HomePage/images/calendar.png" alt={t('donate.giveMonthly.title')} />
                    <h3>{t('donate.giveMonthly.title')}</h3>
                    <p>{t('donate.giveMonthly.description')}</p>
                </div>
                <div className="block-link">
                    <span>{t('donate.link.giveMonthly')}</span>
                </div>
            </Link>
            {/* Anchor tag to trigger scrolling to the map component */}
            <a href="#map" className="donate-block" onClick={scrollToMap}>
                <div className="block-content">
                    <img src="src/pages/HomePage/images/locator.png" alt={t('donate.findFoodbank.title')} />
                    <h3>{t('donate.findFoodbank.title')}</h3>
                    <p>{t('donate.findFoodbank.description')}</p>
                </div>
                <div className="block-link">
                    <span>{t('donate.link.findFoodbank')}</span>
                </div>
            </a>
            {/* Link to volunteer page */}
            <Link to={"/volunteer"} className="donate-block">
                <div className="block-content">
                    <img src="src/pages/HomePage/images/volunteer.png" alt={t('donate.volunteer.title')} />
                    <h3>{t('donate.volunteer.title')}</h3>
                    <p>{t('donate.volunteer.description')}</p>
                </div>
                <div className="block-link">
                    <span>{t('donate.link.volunteer')}</span>
                </div>
            </Link>
        </div>
    );
};

export default DonateSection;
