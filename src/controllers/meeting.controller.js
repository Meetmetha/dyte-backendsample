const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { MeetingService } = require('../services');

const createMeetingSession = catchAsync(async (req, res) => {
  const MeetingCreation = await MeetingService.createMeetingSession(req.body);
  if(!MeetingCreation){
    throw new ApiError(httpStatus.BAD_REQUEST,"Something went wrong with Dyte Services");
  }
  res.status(httpStatus.CREATED).json(MeetingCreation);
});

const studentJoining = catchAsync(async (req, res) => {
  const studentToken = await MeetingService.joinMeetingStudent(req.body);
  res.status(httpStatus.CREATED).json({authToken:studentToken});
});

const teacherJoining = catchAsync(async (req, res) => {
  const teacherToken = await MeetingService.joinMeetingTeacher(req.body);
  res.status(httpStatus.CREATED).json({authToken:teacherToken});
});


module.exports = {
  createMeetingSession,
  studentJoining,
  teacherJoining
};
