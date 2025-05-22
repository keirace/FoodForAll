import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import VolunteerPage from "./pages/Volunteer/Volunteer";
import ThankyouPage from "./pages/Volunteer/Thankyou";
import Login from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";
import HomePage from "./pages/HomePage/HomePage";
import DonationForm from "./pages/Donation/donationform";

const router = createBrowserRouter([
	{
		path: "/",
		Component: App,
		children: [
			{
                Component: HomePage,
                index: true
            },
			{
				path: "/volunteer",
				Component: VolunteerPage,
			},
			{ 
				path: "/donate",
				Component: DonationForm,
			},
			{
				path: "/login",
				Component: Login,
			},
			{
				path: "/signup",
				Component: SignUp,
			},
			{
				path: "/thankyou",
				Component: ThankyouPage,
			},
		],
	},
]);

export default router;
