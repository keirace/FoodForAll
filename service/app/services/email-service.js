import nodemailer from "nodemailer";

// Function to send confirmation email
export async function sendConfirmationEmail(email, firstName, lastName, subject, text) {
	// Create a nodemailer transporter
	let transporter = nodemailer.createTransport({
		// Specify email service provider and authentication credentials
		service: "gmail",
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
		},
	});

	// Define email content
	let mailOptions = {
		from: {
			name: "Food for All",
			address: process.env.MAIL_USER,
		},
		to: email,
		subject: subject,
		text: `Hello ${firstName} ${lastName},\n\n${text}`,
	};

	// Send the email
	await transporter.sendMail(mailOptions);
}