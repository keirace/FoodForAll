/**
 * UserStoryWork Component
 * A component to display a user story with an image, title, and content.
 * @param image string URL of the image for the user story
 * @param title string Title of the user story
 * @param content string Content of the user story
 */
import React from 'react';
import './../dist/HomePage/main.css'; // Main CSS file for HomePage

interface UserStoryWorkProps {
    image: string; // URL of the image for the user story
    title: string; // Title of the user story
    content: string; // Content of the user story
}

const UserStoryWork: React.FC<UserStoryWorkProps> = ({ image, title, content }) => {
    return (
        <div className="user-story-work">
            {/* Display the image for the user story */}
            <img src={image} alt={title} />
            {/* Display the title of the user story */}
            <h3>{title}</h3>
            {/* Display the content of the user story */}
            <p>{content}</p>
        </div>
    );
}

export default UserStoryWork;
