/**
 * Footer component for the application.
 * Renders a footer section with various blocks containing company information, links, and social media icons.
 * @component
 */
import React from 'react';
import { Typography, Container, Link, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import './../dist/HomePage/main.css';

/**
 * Functional component representing the footer of the application.
 * 
 */
function Footer() {
    // Translation hook for localization
    const { t } = useTranslation();

    return (
        // Footer section
        <footer className="footer">
            <Container>
                {/* Main content section of the footer */}
                <div className="footer-content">
                    {/* Block containing logo, address, email, phone, and socials */}
                    <div className="footer-logo">
                        <div className="footer-section">
                            {/* Logo */}
                            <div className="logo">
                                <img src="src/pages/HomePage/images/logo-no-background.png" alt="FoodForAll Logo" className="logo-img" width={'150px'} height={'150px'} />
                            </div>
                            {/* Social media icons */}
                            <div className="social-icons">
                                <IconButton aria-label="Facebook" color="inherit">
                                    <Facebook />
                                </IconButton>
                                <IconButton aria-label="Twitter" color="inherit">
                                    <Twitter />
                                </IconButton>
                                <IconButton aria-label="Instagram" color="inherit">
                                    <Instagram />
                                </IconButton>
                            </div>
                        </div>
                    </div>

                    {/* Other blocks containing different sections */}
                    {/* About Us */}
                    <div className="footer-block">
                        <div className="footer-section">
                            <Typography variant="h6" gutterBottom>
                                {t('footer.aboutUs.title')}
                            </Typography>
                            <Typography variant="body1">
                                {t('footer.aboutUs.content')}
                            </Typography>
                        </div>
                    </div>
                    {/* Careers */}
                    <div className="footer-block">
                        <div className="footer-section">
                            <Typography variant="h6" gutterBottom>
                                {t('footer.careers.title')}
                            </Typography>
                            <Typography variant="body1">
                                {t('footer.careers.content')}
                            </Typography>
                        </div>
                    </div>
                    {/* Ways to Give */}
                    <div className="footer-block">
                        <div className="footer-section">
                            <Typography variant="h6" gutterBottom>
                                {t('footer.waysToGive.title')}
                            </Typography>
                            <Typography variant="body1">
                                <Link href="/donate">{t('footer.waysToGive.donate')}</Link><br />
                                <Link href="/volunteer">{t('footer.waysToGive.volunteer')}</Link>
                            </Typography>
                        </div>
                    </div>
                    {/* Hunger Facts */}
                    <div className="footer-block">
                        <div className="footer-section">
                            <Typography variant="h6" gutterBottom>
                                {t('footer.hungerFacts.title')}
                            </Typography>
                            <Typography variant="body1">
                                <Link href="https://www.un.org/en/global-issues/food">{t('footer.hungerFacts.content')}</Link>
                            </Typography>
                        </div>
                    </div>
                    {/* Contact Us */}
                    <div className="footer-block">
                        <div className="footer-section">
                            <Typography variant="h6" gutterBottom>
                                {t('footer.contactUs.title')}
                            </Typography>
                            <Typography variant="body1">
                                {t('footer.contactUs.content')}
                            </Typography>
                        </div>
                    </div>
                </div>
            </Container>
            {/* Copyright */}
            <Typography variant="body2" className="copyright">
                © {new Date().getFullYear()} FoodForAll. All rights reserved.
            </Typography>
        </footer>
    );
}

export default Footer;
