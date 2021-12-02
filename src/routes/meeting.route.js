const express = require('express');
const validate = require('../middlewares/validate');
const authadmin = require('../middlewares/authAdmin');
const meetingValidation = require('../validations/meeting.validation');
const meetingController = require('../controllers/meeting.controller');

const router = express.Router();

router.post('/create-meeting-session', authadmin(), validate(meetingValidation.createMeetingSession), meetingController.createMeetingSession); //authadmin checks for admin header
router.post('/student-join', validate(meetingValidation.studentJoinValidator), meetingController.studentJoining);
router.post('/teacher-join', validate(meetingValidation.teacherJoinValidator), meetingController.teacherJoining);

module.exports = router;