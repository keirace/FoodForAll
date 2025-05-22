import * as service from "./api-service";
import { User } from "../models/User";

/**
 * Endpoint path for user-related API operations.
 *
 * @type {string}
 */
const UserAPI = "User";

/**
 * Searches for a user based on the provided email and password.
 *
 * @param {string} email - The email of the user to search for.
 * @param {string} password - The password of the user to search for.
 * @returns {Promise<any>} A Promise resolving to the search result.
 */
export const searchUser = async (email = "", password = ""): Promise<User | undefined> => {
	// if (email != '' && password != '') {
		return await service.search(UserAPI, `email=${email}&password=${password}`);
	// }
};

/**
 * Creates a new user with the provided data.
 *
 * @param {User} body - The user data to be posted.
 * @returns {Promise<any>} A Promise resolving to the result of the post operation.
 */
export const postUser = async (body: User): Promise<any> => {
	return await service.post(UserAPI, body);
};

/**
 * Updates an existing user with the provided data.
 *
 * @param {string} id - The ID of the user to be updated.
 * @param {User} body - The updated user data.
 * @returns {Promise<User>} A Promise resolving to the updated user object.
 */
export const updateUser = async (id: string, body: User): Promise<User> => {
	return await service.put<User>(UserAPI, id, body);
};

/**
 * Deletes a user with the specified ID.
 *
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Promise<User>} A Promise resolving to the deleted user object.
 */
export const deleteUser = async (id: string): Promise<User> => {
	console.log('del')
	return await service.del<User>(UserAPI, id);
};

export const getAuthTokenCookie = async (name: string): Promise<string | null> => {
	const cookies = document.cookie.split(";");
	for (const cookie of cookies) {
		const [cookieName, cookieValue] = cookie.trim().split("=");
		if (decodeURIComponent(cookieName) === name) {
			console.log(name, ' ', decodeURIComponent(cookieValue))
			return await decodeURIComponent(cookieValue);
		}
	}
	return null;
};
