import express from 'express';

import fcmService from './../service/Fcm/fcmService';
const router = express.Router();

router.post('/', async (req, res) => {
    const { activityId, courseId, rubricVersionId } = req.body;
    try {
      const result = await fcmService.sendNotificationsForActivity(courseId, activityId, rubricVersionId);
      if (result === true) {
        res.status(200).send({ message: 'Notification sent successfully.', success: true });
      }
    } catch (error) {
      if (error.message === 'Failed to send notification.') { // Assuming the service throws a specific error message
        res.status(500).send({ message: 'Failed to send notification.', success: false });
      } else {
        res.status(500).send({ message: error.message, success: false }); // Generic error handling
      }
    }
});

export default router;