import React from 'react';

const Template1 = ({ resumeData }) => {
  return (
    <div className="resume-template template1">
      <header>
        <h1>{resumeData.name}'s Resume</h1>
        <p>{resumeData.email} | {resumeData.mobile}</p>
      </header>

      <section className="about-me">
        <h2>About Me</h2>
        <p>{resumeData.about}</p>
      </section>

      <section className="certifications">
        <h2>Certifications</h2>
        <ul>
          {resumeData.certifications.map((certification, index) => (
            <li key={index}><strong>{certification.name}</strong> - {certification.link}</li>
          ))}
        </ul>
      </section>

      <section className="achievements">
        <h2>Achievements</h2>
        <ul>
          {resumeData.achievements.map((achievement, index) => (
            <li key={index}><strong>{achievement.title}</strong> - {achievement.description}</li>
          ))}
        </ul>
      </section>

      <section className="skills">
        <h2>Skills</h2>
        <p>{resumeData.skills.join(', ')}</p>
      </section>

      <section className="projects">
        <h2>Projects</h2>
        <ul>
          {resumeData.projects.map((project, index) => (
            <li key={index}>
              <strong>{project.projectName}</strong> - {project.description}<br />
              Collaborated with: {project.Collaborated_with}<br />
              Technologies Used: {project.technologiesUsed.join(', ')}
            </li>
          ))}
        </ul>
      </section>

  <section className="hobbies">
    <h2>Hobbies</h2>
    <p>{resumeData.hobbies.join(', ')}</p>
  </section>

<section className="education">
  <h2>Education</h2>
  <ul>
    {resumeData.education.map((edu, index) => (
      <li key={index}>
        <strong>{edu.collegeName}</strong>, {edu.course} ({edu.branch}) - CGPA: {edu.cgpa}<br />
        {edu.from} - {edu.to}
      </li>
    ))}
  </ul>
</section>

      <section className="experience">
        <h2>Experience</h2>
        <ul>
          {resumeData.experience.map((exp, index) => (
            <li key={index}>
              <strong>{exp.employer}</strong> ({exp.start} - {exp.end}) - {exp.description}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Template1;
