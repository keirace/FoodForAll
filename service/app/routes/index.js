import foodBankRouter from './food-bank-route.js';
import volunteerOpportunityRouter from './volunteer-opportunity-route.js';
import volunteerRouter from './volunteer-route.js';
import donationRouter from './donationform-route.js';
import userRouter from './user-route.js';

const initializeRoutes = (app) => {
    app.use('/foodbank', foodBankRouter);
    app.use('/volunteeropportunity', volunteerOpportunityRouter);
    app.use('/volunteer', volunteerRouter);
    app.use('/donation', donationRouter)
    app.use('/user', userRouter)
}

export default initializeRoutes; 
