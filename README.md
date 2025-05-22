# **FoodForAll Website**
The FoodForAll website is a platform designed to address food insecurity by connecting food donors, volunteers, and recipients. Below, I’ll provide an overview of the website’s purpose, components, and user stories.

## **Purpose**
The primary goal of the FoodForAll website is to facilitate the efficient distribution of food resources, encourage donations, and foster community engagement. Users can participate in various ways, including making food donations, contributing money, volunteering, and sharing their personal experiences.

## **Components**
1. FoodDonation
Represents a donation of food items.
Attributes:
id: Unique identifier for the donation.
foodType: Description of the donated food (e.g., “canned goods,” “fresh produce”).
donationDate: Date when the food was donated.
2. MoneyDonation
Represents a monetary donation.
Attributes:
id: Unique identifier for the donation.
amount: Amount of money donated.
donationDate: Date when the money was donated.
3. VolunteeringOpportunity
Describes an opportunity for volunteers to participate.
Attributes:
id: Unique identifier for the opportunity.
title: Title of the volunteering opportunity.
description: Details about the opportunity.
startDate: Start date of the volunteering period.
endDate: End date of the volunteering period.
capacity: Maximum number of volunteers allowed.
volunteers: List of users who have signed up for this opportunity.
addVolunteer(volunteer): Method to add a user as a volunteer.
4. UserStory
Represents a user’s personal experience or story related to food donations or volunteering.
Attributes:
id: Unique identifier for the story.
content: Text content of the user’s story.
date: Date when the story was shared.
5. User
Represents a user of the platform.
Attributes:
id: Unique identifier for the user.
userType: Type of user (e.g., donor, volunteer, recipient).
name: User’s name.
email: User’s email address.
password: User’s password.
foodDonations: List of food donations made by the user.
moneyDonations: List of monetary donations made by the user.
volunteeringOpportunities: List of volunteering opportunities the user has signed up for.
userStories: List of user-generated stories.
Methods:
makeFoodDonation(foodDonation): Record a food donation.
makeMoneyDonation(moneyDonation): Record a monetary donation.
signUpForVolunteering(opportunity): Sign up for a volunteering opportunity.
addUserStory(story): Share a user story.
6. FoodBank
Represents a food bank organization.
Attributes:
name: Name of the food bank.
address: Physical address of the food bank.
city: City where the food bank is located.
state: State where the food bank operates.
zipcode: ZIP code of the food bank location.
User Stories
User stories are granular representations of people’s goals, aspirations, and expectations. They help designers and product managers understand users’ needs, empathize with them, and generate solutions that provide value to the people they design for12. Here are some example user stories for the FoodForAll website:

## **Donor’s Perspective:**
As a food donor, I want to easily submit details about the food items I wish to donate so that they can reach those in need.
As a donor, I want to receive confirmation and updates on my food donations to stay informed about their impact.
**Volunteer’s Perspective:**
As a volunteer, I want to browse available volunteering opportunities, sign up for shifts, and contribute my time to food distribution events.
As a volunteer, I want to connect with other like-minded individuals and build a sense of community.
**Recipient’s Perspective:**
As a recipient, I want to find nearby food banks, view their operating hours, and access information about available food resources.
As someone in need, I want to share my personal story to inspire others and create awareness about food insecurity.

## **Instructions to Run and Navigate the Website:**

Sign Up:

Navigate to the sign-up page.
Enter your name, email address, and password.
Select your user type (donor, volunteer, recipient).
Click on the sign-up button to create your account.

Login:

After signing up, navigate to the login page.
Enter your email address and password.
Click on the login button to access your account.

Homepage:

Upon successful login, you will be redirected to the homepage.
From the homepage, you can navigate to various sections of the website such as food bank locator, volunteering opportunities, and donations.

Food Bank Locator:

Navigate to the food bank locator page to find nearby food banks.
View their operating hours and access information about available food resources.

Volunteering or Donation:

Depending on your preference, you can navigate to either the volunteering or donation section.
Browse available opportunities or donation options and choose the one you would like to participate in.

Donation Payment:

If you choose to make a donation, you will be directed to the donation payment page.
Enter the necessary details and complete the payment process.

Instructions to RUN : 
1. switch to app . on terminal type : `npm run dev`
   front end will start and follow the below link and you should be on the website ~ FOOD FOR ALL.
                         https:/localhost/****
2. for backend server switch to service and `node server.js`
   you see data connected and running.
