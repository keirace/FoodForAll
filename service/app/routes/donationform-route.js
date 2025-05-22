import express from "express";// Import donationForm controller
import * as donationForm from '../controllers/donationform-controller.js';// Initialize express router
// Create a new router
const router = express.Router();
// Set up routes
router.route('/')
    .get(donationForm.search) // Search for participants
    .post(donationForm.post);// Create new participant
// Set up routes
router.route('/:id')
    .get(donationForm.get);

export default router;