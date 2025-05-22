import * as service from './api-service';
import { FoodBank } from '../models/Volunteer';

/**
 * Endpoint path for the food bank API.
 * 
 * @type {string}
 */
const foodBankAPI = 'foodbank';

/**
 * Searches for food banks based on the specified parameters.
 * 
 * @param {Object} params - Optional query parameters.
 * @returns {Promise<FoodBank[]>} A Promise resolving to an array of FoodBank objects.
 */
export const searchFoodBanks = async (params = {}): Promise<FoodBank[]> => {
    return await service.search<FoodBank>(foodBankAPI, params);
}
