const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const meetingSchema = mongoose.Schema(
  {
    studentId: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        default: null,
    },
    teacherId: {
        type: String,
        required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
    roomName: {
      type: String,
      required: true,
    },
    studentToken: {
      type: String,
      required: true,
    },
    teacherToken: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
meetingSchema.plugin(paginate);

/**
 * @typedef Meeting
 */
const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
