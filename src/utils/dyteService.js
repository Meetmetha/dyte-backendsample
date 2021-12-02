const axios = require('axios');
const ApiError = require('./ApiError');
const Meeting = require('../models/meeting.model')

const InitiateMeetingRoom = async (meetingName) => {
  const InitMeeting = JSON.stringify({
    title: meetingName,
    presetName: 'DoubtSession', //Add your Preset here
    authorization: { closed: true },
  });
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `APIKEY ${process.env.DYTE_API_KEY}`,
  };
  let Meetingresult = '';

  await axios
    .post(`${process.env.DYTE_API_BASE_URL}/organizations/${process.env.DYTE_ORG_ID}/meeting`, InitMeeting, {
      headers,
    })
    .then((response) => {
      Meetingresult = response.data.data;
    })
    .catch((err) => {
      console.log(err);
      throw new ApiError(400, 'Error Generating Dyte Meeting');
    });

  return Meetingresult;
};

const addStudentToMeeting = async (meetingID, studentId, studentName) => {
  const AddStudentToMeeting = JSON.stringify({
    userDetails: {
      name: studentName,
    },
    clientSpecificId: studentId,
    presetName: 'DoubtSession',
  });
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `APIKEY ${process.env.DYTE_API_KEY}`,
  };
  let StudentParticipantresult = '';
  await axios
    .post(
      `${process.env.DYTE_API_BASE_URL}/organizations/${process.env.DYTE_ORG_ID}/meetings/${meetingID}/participant`,
      AddStudentToMeeting,
      {
        headers,
      }
    )
    .then((response) => {
      StudentParticipantresult = response.data.data;
    })
    .catch(() => {
      throw new ApiError(400, 'Error Adding Student Participant');
    });

  return StudentParticipantresult;
};

const addTeacherToMeeting = async (meetingID, teacherId, teacherName) => {
  const AddTeacherToMeeting = JSON.stringify({
    userDetails: {
      name: teacherName,
    },
    clientSpecificId: teacherId,
    presetName: 'DoubtSession',
  });
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `APIKEY ${process.env.DYTE_API_KEY}`,
  };
  let TeacherParticipantresult = '';
  await axios
    .post(
      `${process.env.DYTE_API_BASE_URL}/organizations/${process.env.DYTE_ORG_ID}/meetings/${meetingID}/participant`,
      AddTeacherToMeeting,
      {
        headers,
      }
    )
    .then((response) => {
      TeacherParticipantresult = response.data.data;
    })
    .catch(() => {
      throw new ApiError(400, 'Error Adding Teacher Participant');
    });

  return TeacherParticipantresult;
};

const createDyteMeeting = async (requestBody) => {
  const meetingName = `${requestBody.studentName} & ${requestBody.teacherName}` //Just a meeting roomname for better understanding
  const meetingroom = await InitiateMeetingRoom(meetingName);
  const studentparticipation = await addStudentToMeeting(meetingroom.meeting.id, requestBody.studentId);
  const teacherparticipation = await addTeacherToMeeting(meetingroom.meeting.id, requestBody.teacherId);
  const MeetingSessionData = await Meeting.create({
    studentId: requestBody.studentId,
    studentName: requestBody.studentName,
    teacherId: requestBody.teacherId,
    teacherName: requestBody.teacherName,
    roomName: meetingroom.meeting.roomName,
    studentToken: studentparticipation.authResponse.authToken,
    teacherToken: teacherparticipation.authResponse.authToken,
  });
  if (!MeetingSessionData) {
    throw new ApiError(400, 'Error Triggered! Unable to Initiate Meeting Session');
  }
  return MeetingSessionData._id;
};

module.exports = {
  createDyteMeeting,
};
