const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  collegeName: {
    type: String,
    required: true,
  },
  course: String,
  branch: String,
  cgpa: Number,
  from: String,
  to: String,
});

const projectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  description: String,
  Collaborated_with:String,
  technologiesUsed: [String],
  start: String,
  end: String,
});

const experienceSchema = new mongoose.Schema({
  employer: {
    type: String,
    required: true,
  },
  
  description: String,
  start: String,
  end: String,
});

const certificateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  link: String,
});

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: String,
  mobile: String,
  email: {
    type: String,
    required: true,
  },
  certifications: [certificateSchema],
  achievements: [
    {
      title: {
        type: String,
        required: true,
      },
      description: String,
    },
  ],
  skills: [String],
  projects: [projectSchema],
  hobbies: [String],
  education: {
    type: [educationSchema],
    required: true,
  },
  experience: {
    type: [experienceSchema],
  },
});

const Resume = mongoose.model('Resume', resumeSchema);

module.exports = Resume;
