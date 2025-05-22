/**
 * Handles requests related to volunteer opportunities.
 * @module controllers/volunteerOpportunityController
 */

import * as volunteerOpportunity from '../services/volunteer-opportunity-service.js';
import {
    setResponse,
    setError
} from './response-handler.js';

/**
 * Handles the search operation for volunteer opportunities based on query parameters.
 * @param {object} request - The request object containing query parameters.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const search = async (request, response) => {
    try {
        const opportunities = await volunteerOpportunity.search({
            ...request.query
        });
        setResponse(opportunities, response);
    } catch (error) {
        setError(error, response);
    }
}

/**
 * Handles the creation of a new volunteer opportunity.
 * @param {object} request - The request object containing the data for the new volunteer opportunity.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const post = async (request, response) => {
    try {
        const opportunity = await volunteerOpportunity.save({
            ...request.body
        });
        setResponse(opportunity, response);
    } catch (error) {
        setError(error, response);
    }
}

/**
 * Handles retrieving information about a specific volunteer opportunity.
 * @param {object} request - The request object containing the ID of the volunteer opportunity to retrieve.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const get = async (request, response) => {
    try {
        const opportunity = await volunteerOpportunity.get(request.params.id);
        setResponse(opportunity, response);
    } catch (error) {
        setError(error, response);
    }
}
