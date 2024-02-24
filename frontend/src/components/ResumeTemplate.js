import React from 'react';

const ResumeTemplate = ({ resumeData }) => {
  return (
    <div>
      <h1>{resumeData.name}'s Resume</h1>

      <h2>Contact Information</h2>
      <p>Email: {resumeData.email}</p>
      <p>Mobile: {resumeData.mobile}</p>

      <h2>Certifications</h2>
      <ul>
        {resumeData.certifications.map((certification, index) => (
          <li key={index}>
            {certification.name} - {certification.link}
          </li>
        ))}
      </ul>

      <h2>Achievements</h2>
      <ul>
        {resumeData.achievements.map((achievement, index) => (
          <li key={index}>
            <strong>{achievement.title}</strong>: {achievement.description}
          </li>
        ))}
      </ul>

      <h2>Skills</h2>
      <p>{resumeData.skills.join(', ')}</p>

      <h2>Projects</h2>
      <ul>
        {resumeData.projects.map((project, index) => (
          <li key={index}>
            <strong>{project.projectName}</strong> ({project.start} - {project.end}): {project.description}
            <br />
            Collaborated with: {project.Collaborated_with}
            <br />
            Technologies Used: {project.technologiesUsed.join(', ')}
          </li>
        ))}
      </ul>

      <h2>Hobbies</h2>
      <p>{resumeData.hobbies.join(', ')}</p>

      <h2>Education</h2>
      <ul>
        {resumeData.education.map((edu, index) => (
          <li key={index}>
            {edu.collegeName}, {edu.course} ({edu.branch}) - CGPA: {edu.cgpa}
            <br />
            {edu.from} - {edu.to}
          </li>
        ))}
      </ul>

      <h2>Experience</h2>
      <ul>
        {resumeData.experience.map((exp, index) => (
          <li key={index}>
            {exp.employer} ({exp.start} - {exp.end}): {exp.description}
          </li>
        ))}
      </ul>
      

      {/* Render the PDF viewer */}
    </div>
  );
};

export default ResumeTemplate;
