/**
 * Handles requests related to food bank operations.
 * @module controllers/foodBankController
 */

import * as foodBankService from '../services/food-bank-locator-service.js';
import {
    setResponse,
    setError
} from './response-handler.js';

/**
 * Handles the search operation for food banks based on query parameters.
 * @param {object} request - The request object containing query parameters.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const search = async (request, response) => {
    try {
        const foodBanks = await foodBankService.search({
            ...request.query
        });
        setResponse(foodBanks, response);
    } catch (error) {
        setError(error, response);
    }
}

/**
 * Handles the creation of a new food bank.
 * @param {object} request - The request object containing the data for the new food bank.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const post = async (request, response) => {
    try {
        const foodBank = await foodBankService.save({
            ...request.body
        });
        setResponse(foodBank, response);
    } catch (error) {
        setError(error, response);
    }
}

/**
 * Handles retrieving information about a specific food bank.
 * @param {object} request - The request object containing the ID of the food bank to retrieve.
 * @param {object} response - The response object to send back to the client.
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 */
export const get = async (request, response) => {
    try {
        const foodBank = await foodBankService.get(request.params.id);
        setResponse(foodBank, response);
    } catch (error) {
        setError(error, response);
    }
}
