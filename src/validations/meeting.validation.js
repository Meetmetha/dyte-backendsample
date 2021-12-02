const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createMeetingSession = {
  body: Joi.object().keys({
    studentId: Joi.string().required(), //This is Student clientSpeficID passed to Dyte
    studentName: Joi.string().required(),
    teacherId: Joi.string().required(), //This is Teacher clientSpeficID passed to Dyte
    teacherName: Joi.string().required(),
  }),
};

const studentJoinValidator = {
  body: Joi.object().keys({
    meetingId: Joi.string().required().custom(objectId),
    studentId: Joi.string().required(), //This is Student clientSpeficID passed checked in DB
  }),
};

const teacherJoinValidator = {
  body: Joi.object().keys({
    meetingId: Joi.string().required().custom(objectId),
    teacherId: Joi.string().required(), //This is Teacher clientSpeficID passed checked in DB
  }),
};


module.exports = {
  createMeetingSession,
  studentJoinValidator,
  teacherJoinValidator,
};
