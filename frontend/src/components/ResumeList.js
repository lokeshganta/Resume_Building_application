// src/components/ResumeList.js
import React, { useState, useEffect } from 'react';
import authService from '../services/authService';

const ResumeList = () => {
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await authService.getResumes();
        setResumes(response);
      } catch (error) {
        console.error('Error fetching resumes:', error);
      }
    };

    fetchResumes();
  }, []);

  return (
    <div>
      <h2>Resume List</h2>
      <ul>
        {resumes.map(resume => (
          <li key={resume._id}>
            <h3>{resume.name}</h3>
            <p>Email: {resume.email}</p>
            {/* Include other resume details you want to display */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResumeList;
