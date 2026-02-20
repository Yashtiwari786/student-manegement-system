// routes/announcements.js (ES Module style)

import express from 'express';
import auth from '../middleware/authMiddleware.js';
import roles from '../middleware/roles.js';
import * as announcementController from '../controllers/announcementController.js';

const router = express.Router();

// Teacher creates announcement
router.post('/', auth, roles('teacher'), announcementController.createAnnouncement);

// Director creates announcement
router.post('/director', auth, roles('director'), announcementController.createDirectorAnnouncement);

// Student reads announcements
router.get('/student', auth, announcementController.getAnnouncementsForStudent);

// Director sends message to teacher
router.post('/message', auth, roles('director'), announcementController.sendMessageToTeacher);

// Teacher retrieves messages from director
router.get('/messages/:teacherId', auth, roles('teacher'), announcementController.getMessagesFromDirector);

// Get all announcements
router.get('/', auth, announcementController.getAllAnnouncements);

// Export router as default
export default router;