import React from 'react';
import UserStoryWork from './UserStoryWork'; // Import the UserStory component
import './../dist/HomePage/main.css';
import { useTranslation } from 'react-i18next';

/**
 * Interface representing the structure of a work story.
 */
interface WorkStory {
    image: string; // URL of the image
    title: string; // Title of the story
    content: string; // Content of the story
}

/**
 * Props interface for the OurWorkSection component.
 */
interface OurWorkSectionProps {
    stories: WorkStory[]; // Array of work stories
}

/**
 * Functional component representing the section displaying work stories.
 * @param stories Array of work stories to display.
 */
const OurWorkSection: React.FC<OurWorkSectionProps> = ({ stories }) => {
    const { t } = useTranslation(); // Hook for translation

    return (
        <section className="our-work-section">
            {/* Section title */}
            <h2>{t('ourWork.title')}</h2>
            {/* Container for user stories */}
            <div className="user-stories-container">
                {/* Map over each story and render UserStoryWork component */}
                {stories.map((story, index) => (
                    <UserStoryWork key={index} image={story.image} title={story.title} content={story.content} />
                ))}
            </div>
        </section>
    );
}

export default OurWorkSection;
