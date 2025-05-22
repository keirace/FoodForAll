/**
 * Represents the structure of a user object.
 * @interface User
 */
export interface User {
	id?: string;
	/**
	 * The first name of the user.
	 * @type {string}
	 */
	firstName: string;

	/**
	 * The last name of the user.
	 * @type {string}
	 */
	lastName: string;

	/**
	 * The email address of the user.
	 * @type {string}
	 */
	email: string;

	/**
	 * The password of the user.
	 * @type {string}
	 */
	password: string;
}
