/**
 * Base URL for the Express.js course registration server.
 * 
 * @type {string}
 */
const serverURL = "http://localhost:3000";

/**
 * Performs a GET request to the specified path with optional query parameters.
 * 
 * @param {string} path - The endpoint path.
 * @param {Object} params - Optional query parameters.
 * @returns {Promise<T>} A Promise resolving to the JSON response.
 */
export const search = async <T>(path: string, params: any = {}): Promise<T> => {
	const query: URLSearchParams = new URLSearchParams(params);
	const response = await fetch(`${serverURL}/${path}?${query}`, {
		method: "GET",
	});
	if (!response) {
		throw new Error("Network response was not ok");
	}
	return response.json();
};

/**
 * Performs a GET request to the specified path with optional query parameters.
 * 
 * @param {string} path - The endpoint path.
 * @param {Object} params - Optional query parameters.
 * @returns {Promise<T>} A Promise resolving to the JSON response.
 */
export const searchUser = async <T>(path: string, params: any = {}): Promise<any> => {
	const query: URLSearchParams = new URLSearchParams(params);
	const response = await fetch(`${serverURL}/${path}?${query}`, {
		method: "GET",
	});
	if (!response) {
		throw new Error("Network response was not ok");
	}
	return response;
};

/**
 * Performs a POST request to the specified path with a JSON body.
 * 
 * @param {string} path - The endpoint path.
 * @param {Object} body - The JSON data to be sent in the request body.
 * @returns {Promise<T>} A Promise resolving to the JSON response.
 */
export const post = async <T>(path: string, body: any = {}): Promise<T> => {
	const response = await fetch(`${serverURL}/${path}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	return response.json();
};

/**
 * Performs a PUT request to the specified path with a JSON body.
 * 
 * @param {string} path - The endpoint path.
 * @param {string} id - The ID of the resource to be updated.
 * @param {Object} body - The JSON data to be sent in the request body.
 * @returns {Promise<T>} A Promise resolving to the JSON response.
 */
export const put = async <T>(path: string, id: string, body: any = {}): Promise<T> => {
	const response = await fetch(`${serverURL}/${path}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
	if (!response) {
		throw new Error("There is some issue with updating...");
	}
	return response.json();
};

/**
 * Performs a DELETE request to the specified path for the resource with the given ID.
 * 
 * @param {string} path - The endpoint path.
 * @param {string} id - The ID of the resource to be deleted.
 * @returns {Promise<T>} A Promise resolving to the JSON response.
 */
export const del = async <T>(path: string, id: string): Promise<T> => {
	console.log
	const response = await fetch(`${serverURL}/${path}/${id}`, {
		method: "DELETE",
	});
	console.log(response)
	if (!response) {
		throw new Error("There is some issue with deleting...");
	}

	return await response.json();
};
