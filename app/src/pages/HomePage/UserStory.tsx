/**
 * UserStory Component
 * A component to display a user story with an image, title, and content.
 * @param image string URL of the image for the user story
 * @param title string Title of the user story
 * @param content string Content of the user story
 */
import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';

interface UserStoryProps {
    image: string; // URL of the image for the user story
    title: string; // Title of the user story
    content: string; // Content of the user story
}

const UserStory: React.FC<UserStoryProps> = ({ image, title, content }) => {
    return (
        <Card sx={{ maxWidth: 400, margin: '15px auto' }}>
            {/* Display the image for the user story */}
            <CardMedia
                component="img"
                height="300"
                image={image}
                alt={title}
            />
            <CardContent>
                {/* Display the title of the user story */}
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                {/* Display the content of the user story */}
                <Typography variant="body2" color="text.secondary">
                    {content}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default UserStory;
