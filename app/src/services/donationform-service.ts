// Objective: Service to handle donation form requests
import * as service from './api-service';
import { Donation }  from '../models/donation.ts';

// API endpoint
const donationAPI = 'donation';

// Post donation
// Post donation to the server
export const postDonation = async (body : Donation): Promise<Donation[]> => {
    return await service.post<Donation>(donationAPI, body);
}