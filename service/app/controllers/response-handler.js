/**
 * Sets a successful response with the provided data.
 * @param {*} data - The data to be sent in the response.
 * @param {object} response - The response object to send back to the client.
 * @returns {void} This function does not return anything.
 */
export const setResponse = (data, response) => {
    response.status(200);
    response.json(data);
    console.log(response);
}

/**
 * Sets an error response with the provided error information.
 * @param {Error} err - The error object containing information about the error.
 * @param {object} response - The response object to send back to the client.
 * @returns {void} This function does not return anything.
 */
export const setError = (err, response) => {
    console.log(err);
    response.status(500);
    response.json({
        error: {
            code: 'InternalServerError',
            message: 'Error occurred while processing the request'
        }
    })
}
