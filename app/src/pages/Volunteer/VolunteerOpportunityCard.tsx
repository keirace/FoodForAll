// src/components/VolunteerOpportunityCard.tsx
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { VolunteerOpportunity } from '../../models/Volunteer';
import { useState } from 'react';

type Props = {
    opportunity: VolunteerOpportunity,
    isSelected: boolean; // New prop to track selection
    onClick: () => void; // New prop for callback
}

const VolunteerOpportunityCard = (props: Props) => {
    const addr = props.opportunity.address;
    const address = `${addr.street}, ${addr.city}, ${addr.state}, ${addr.zip_code}`
    // const address1 = ${props.opportunity.address.street}, ${address.city}, ${address.state}, ${address.zip_code};
    return (
        <Card sx={{ cursor: 'pointer', backgroundColor: props.isSelected ? '#4e5b31' : '', color: props.isSelected ? '#fff' : '#000' }} onClick={props.onClick}>
            <CardHeader
                title={props.opportunity.title}
                subheader={address}
            />
            <CardContent>
                <Typography variant="body2">{props.opportunity.description}</Typography>
            </CardContent>
        </Card>
    );
};

export default VolunteerOpportunityCard;
