import * as service from './api-service';
import { VolunteerOpportunity, Volunteer } from '../models/Volunteer';

/**
 * Endpoint path for volunteer opportunity-related API operations.
 * 
 * @type {string}
 */
const volunteerOpportunityAPI = 'volunteeropportunity';

/**
 * Endpoint path for volunteer-related API operations.
 * 
 * @type {string}
 */
const volunteerAPI = 'volunteer';

/**
 * Searches for volunteer opportunities based on the provided zip code.
 * 
 * @param {string} zipCode - The zip code to search for volunteer opportunities.
 * @returns {Promise<VolunteerOpportunity[]>} A Promise resolving to an array of VolunteerOpportunity objects.
 */
export const searchOpportunities = async (zipCode = ''): Promise<VolunteerOpportunity[]> => {
    return await service.search<VolunteerOpportunity[]>(volunteerOpportunityAPI, `zip_code=${zipCode}`);
}

/**
 * Posts a new volunteer entry with the provided data.
 * 
 * @param {Volunteer} body - The volunteer data to be posted.
 * @returns {Promise<Volunteer>} A Promise resolving to the posted Volunteer object.
 */
export const postVolunteer = async (body: Volunteer): Promise<Volunteer> => {
    return await service.post<Volunteer>(volunteerAPI, body);
}
