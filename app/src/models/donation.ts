export interface Donation {
	_id?: string;
	firstName?: string;
	lastName?: string;
	email: string;
	city: string;
	state: string;
    zip_code: string;
    cardNumber: string;
    cvv: string;
    expiry: string;
    amount: string;
    honor: string;
}
