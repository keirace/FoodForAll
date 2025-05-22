/**
 * UserStoriesList Component
 * A component to display a list of user stories with images, titles, and content.
 */
import React from 'react';
import UserStory from './UserStory'; // Import the UserStory component
import './../dist/HomePage/main.css'; // Main CSS file for HomePage
import { useTranslation } from 'react-i18next'; // Import useTranslation hook

const UserStoriesList: React.FC = () => {
    const { t } = useTranslation(); // Translation hook

    // Demo user stories data
    const stories = [
        {
            image: 'src/pages/HomePage/images/Global Hunger.jpg',
            title: t('userStories.globalHunger.title'), // Translate title
            content: t('userStories.globalHunger.content'), // Translate content
        },
        {
            image: 'src/pages/HomePage/images/Rising.jpg',
            title: t('userStories.impactOnChildren.title'), // Translate title
            content: t('userStories.impactOnChildren.content'), // Translate content
        },
        {
            image: 'src/pages/HomePage/images/hunger.jpg',
            title: t('userStories.globalIssuesIntensifyHunger.title'), // Translate title
            content: t('userStories.globalIssuesIntensifyHunger.content'), // Translate content
        },
    ];

    return (
        <div className="user-stories-container">
            {/* Map through user stories and render UserStory component */}
            {stories.map((story, index) => (
                <div className="user-story" key={index}>
                    <UserStory image={story.image} title={story.title} content={story.content} />
                </div>
            ))}
        </div>
    );
}

export default UserStoriesList;
