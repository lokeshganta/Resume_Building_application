const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Resume = require('./models/Resume');
const cors = require('cors');
const path = require('path'); // Node.js module for working with file paths
const handlebarsHelpers = require('./helpers/handlebars-helpers');
// const authRoutes = require('./routes/auth');
const passport = require('passport');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 5000;  
const apiRoutes=require('./routes/api')
const authRoutes = require('./routes/auth');


// MongoDB Atlas connection string (replace with your actual connection string)
const MONGODB_URI = 'mongodb+srv://lokesh:root@cluster0.g56daiz.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// app.use('/auth', authRoutes);
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};
// Get all resumes
app.get('/resumes',isAuthenticated, async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Add a new resume
app.post('/resumes',isAuthenticated, async (req, res) => {
  const resumeData = req.body;
  console.log('Received resume data:', resumeData);

  try {
    const newResume = new Resume(resumeData);
    await newResume.save();
    res.status(201).json(newResume);
  } catch (error) {
    console.error('Error adding resume:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/resumes/:id',isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedResume = await Resume.findByIdAndUpdate(id, updatedData, { new: true });
    res.json(updatedResume);
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a resume
app.delete('/resumes/:id',isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
    await Resume.findByIdAndDelete(id);
    res.status(204).send(); // No content
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
