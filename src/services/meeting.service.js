const httpStatus = require('http-status');
const { Meeting } = require('../models');
const ApiError = require('../utils/ApiError');
const DyteService = require('../utils/dyteService');

const createMeetingSession = async (requestBody) => {
  const dyteSession = await DyteService.createDyteMeeting(requestBody);
  return dyteSession;
};

const joinMeetingStudent = async (requestBody) => {
  const MeetingData = await Meeting.findOne({ _id: requestBody.meetingId , studentId: requestBody.studentId });
  if(!MeetingData){
    throw new ApiError(httpStatus.BAD_REQUEST, "You do not have access to It or meeting doesnot Exist");
  }
  return MeetingData.studentToken;
};

const joinMeetingTeacher = async (requestBody) => {
  const MeetingData = await Meeting.findOne({ _id: requestBody.meetingId , teacherId: requestBody.teacherId });
  if(!MeetingData){
    throw new ApiError(httpStatus.BAD_REQUEST, "You do not have access to It or meeting doesnot Exist");
  }
  return MeetingData.teacherToken;
};

module.exports = {
  createMeetingSession,
  joinMeetingStudent,
  joinMeetingTeacher,
};
