import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import ResumeTemplate from './components/ResumeTemplate';
import TemplateSelector from './components/TemplateSelector';
import App1 from './components/App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Logout from './components/Auth/Logout';
import ProtectedComponent from './components/ProtectedComponent';
import ResumeList from './components/ResumeList';
import authService from './services/authService';
import './App.css';


function App() {
  const [resumes, setResumes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    about: '',
    mobile: '',
    email: '',
    certifications: [{ name: '', link: '' }],
    achievements: [{ title: '', description: '' }],
    skills: [], 
    projects: [{ projectName: '', description: '',Collaborated_with:'', technologiesUsed: [''], start: '', end: '' }],
    hobbies: [],
    education: [{ collegeName: '', course: '', branch: '', cgpa: '', from: '', to: '' }],
    experience: [{ employer: '', description: '', start: '', end: '' }],
  });

  const [editingResumeId, setEditingResumeId] = useState(null);

  useEffect(() => {
    // Fetch resumes from the backend when the component mounts
    axios.get('http://localhost:5000/resumes')
      .then(response => setResumes(response.data))
      .catch(error => console.error('Error fetching resumes:', error));
  }, []);

 
  const [authenticated, setAuthenticated] = useState(false);
  const checkAuthentication = async () => {
    try {
      const response = await authService.checkAuthentication();
      setAuthenticated(response.data.authenticated);
    } catch (error) {
      console.error('Error checking authentication:', error);
    }
  };
  useEffect(() => {
    checkAuthentication();
  }, []);
  

  
  
  
  const handleInputChange = (e, outerIndex, innerIndex, subField) => {
    const { name, value } = e.target;
    const newData = { ...formData };

    if (name === 'certifications' || name === 'skills' || name === 'hobbies') {
      newData[name] = value.split(',').map(item => item.trim());
    } else if (name === 'name' || name === 'about' || name === 'mobile' || name === 'email') {
      newData[name] = value;
    } else {
      const parts = name.split('-');
  
      // Handle nested fields within Achievements, Projects, Education, and Experience
      if (parts.length >= 2) {
        const [field, index, innerField] = parts;
  
        if (innerField) {
          // Handle nested fields within Achievements, Projects, Education, and Experience
          if (field === 'achievement') {
            if (!newData.achievements[index]) {
              newData.achievements[index] = {};
            }
            newData.achievements[index][innerField] = value;
          }
          else if (field === 'certifications') {
            // Handle the 'name' and 'link' properties for certifications
            if (!newData[field][index]) {
              newData[field][index] = {};
            }
            newData[field][index][subField] = value;
          }
          else if (field === 'project') {
            if (!newData.projects[index]) {
              newData.projects[index] = {
                projectName: '',
                description: '',
                technologiesUsed: [''],
                start: '',
                end: '',
              };
            }
            newData.projects[index][innerField] = value;
            if (innerField === 'technologiesUsed') {
              newData.projects[index][innerField] = [value]; // Convert to an array
            } else {
              newData.projects[index][innerField] = value;
            }
          } else if (field === 'education' || field === 'experience') {
            if (!newData[field][index]) {
              newData[field][index] = {};
            }
            newData[field][index][innerField] = value;
          }
        } 
        else {
          // Handle top-level fields within Achievements, Projects, Education, and Experience
          if (field === 'project' || field === 'education' || field === 'experience') {
            if (!newData[field]) {
              newData[field] = [];
            }
            if (field === 'certifications') {
              // Handle the 'name' and 'link' properties for certifications
              if (!newData[field][index]) {
                newData[field][index] = {};
              }
              newData[field][index][subField] = value;
            } else {
              newData[field][index] = value;
            }
          
            newData[field][index] = value;
          }
        }
      } else {
        newData[name] = value;
      }
    }
  
    setFormData(newData);
  };
  
    

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingResumeId) {
        // Update a resume
        const response = await axios.put(`http://localhost:5000/resumes/${editingResumeId}`, formData);
        setResumes(resumes.map(resume => (resume._id === editingResumeId ? response.data : resume)));
        setEditingResumeId(null);
      } else {
        // Add a new resume
        const response = await axios.post('http://localhost:5000/resumes', formData);
        setResumes([...resumes, response.data]);
      }

      setFormData({
        name: '',
        about: '',
        mobile: '',
        email: '',
        certifications: [],
        achievements: [{ title: '', description: '' }],
        skills: [],
        projects: [{ projectName: '', description: '', technologiesUsed: [''], start: '', end: '' }],
        hobbies: [],
        education: [{ collegeName: '', course: '', branch: '', cgpa: '', from: '', to: '' }],
        experience: [{ employer: '', projects: [{ projectName: '', description: '', technologiesUsed: [''], start: '', end: '' }], description: '', start: '', end: '' }],
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [...prevData.education, { collegeName: '', course: '', branch: '', cgpa: '', from: '', to: '' }],
    }));
  };
  
  const addExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        { employer: '', projects: [], description: '', start: '', end: '' }, // Ensure projects is initialized
      ],
    }));
  };
  
  

    const addAchievement = () => {
      setFormData((prevData) => ({
        ...prevData,
        achievements: [...prevData.achievements, { title: '', description: '' }],
      }));
    };
    const addCertification = () => {
      setFormData((prevData) => ({
        ...prevData,
        certifications: [
          ...prevData.certifications,
          { title: '', link: '' }  // Assuming you have a link property in your certification object
        ],
      }));
    };
    
    const addProject = (experienceIndex) => {
      setFormData((prevData) => {
        const newProjects = [...prevData.projects, { projectName: '', description: '', technologiesUsed: [''], start: '', end: '' }];
        return { ...prevData, projects: newProjects };
      });
    };
    

  const handleEdit = (id) => {
    const selectedResume = resumes.find(resume => resume._id === id);
    setFormData(selectedResume);
    setEditingResumeId(id);
  };

  const handleDelete = async (id) => {
    try {
      // Delete a resume
      await axios.delete(`http://localhost:5000/resumes/${id}`);
      setResumes(resumes.filter(resume => resume._id !== id));
      setEditingResumeId(null);
      setFormData({
        name: '',
        about: '',
        mobile: '',
        email: '',
        certifications: [],
        achievements: [{ title: '', description: '' }],
        skills: [],
        projects: [{ projectName: '', description: '', technologiesUsed: [''], start: '', end: '' }],
        hobbies: [],
        education: [{ collegeName: '', course: '', branch: '', cgpa: '', from: '', to: '' }],
        experience: [{ employer: '', projects: [{ projectName: '', description: '', technologiesUsed: [''], start: '', end: '' }], description: '', start: '', end: '' }],
      });
    } catch (error) {
      console.error('Error deleting resume:', error);
    }
  };

  return (
    <div>
      <h1>Resumes</h1>
      

<form onSubmit={handleSubmit} className="resume-form">
  <div className="form-group">
    <label>Name:</label>
    <input type="text" name="name" value={formData.name} onChange={(e) => handleInputChange(e)} required />
  </div>

  <div className="form-group">
    <label>About:</label>
    <textarea name="about" value={formData.about} onChange={(e) => handleInputChange(e)}></textarea>
  </div>

  <div className="form-group">
    <label>Mobile:</label>
    <input type="text" name="mobile" value={formData.mobile} onChange={(e) => handleInputChange(e)} />
  </div>

  <div className="form-group">
    <label>Email:</label>
    <input type="email" name="email" value={formData.email} onChange={(e) => handleInputChange(e)} required />
  </div>

  {/* Certifications */}
  
  <div className="form-group">
  <label>Certifications:</label>
  {formData.certifications.map((certification, index) => (
    <div key={index} className="certification">
      <input
        type="text"
        name={`certifications-${index}-name`}
        value={certification.name}
        onChange={(e) => handleInputChange(e, index, 'certifications', 'name')}
        placeholder="Certification Name"
        required
      />
      <input
        type="text"
        name={`certifications-${index}-link`}
        value={certification.link}
        onChange={(e) => handleInputChange(e, index, 'certifications', 'link')}
        placeholder="Link"
      />
    </div>
  ))}
  <button type="button" onClick={addCertification}>Add Certification</button>
</div>



  {/* Achievements */}
  <div className="form-group">
    <label>Achievements:</label>
    {formData.achievements.map((achievement, index) => (
  <div key={index} className="achievement">
    <input type="text" name={`achievement-${index}-title`} value={achievement.title} onChange={(e) => handleInputChange(e, index)} placeholder="Title" required />
    <textarea name={`achievement-${index}-description`} value={achievement.description} onChange={(e) => handleInputChange(e, index)} placeholder="Description"></textarea>
  </div>
))}

    <button type="button" onClick={addAchievement}>Add Achievement</button>
  </div>

  {/* Skills */}
  <div className="form-group">
    <label>Skills:</label>
    <input type="text" name="skills" value={formData.skills.join(', ')} onChange={(e) => handleInputChange(e)} />
  </div>

  {/* Projects */}
  <div className="form-group">
  <label>Projects:</label>
  {formData.projects.map((project, index) => (
  <div key={index} className="project">
    <input
      type="text"
      name={`project-${index}-projectName`}
      value={project.projectName}
      onChange={(e) => handleInputChange(e, index, 'projects', 'projectName')}
      placeholder="Project Name"
      required
    />
    <textarea
      name={`project-${index}-description`}
      value={project.description}
      onChange={(e) => handleInputChange(e, index, 'projects', 'description')}
      placeholder="Description"
      required
    ></textarea>
    <input
      type="text"
      name={`project-${index}-Collaborated_with`}
      value={project.Collaborated_with}
      onChange={(e) => handleInputChange(e, index, 'projects', 'Collaborated_with')}
        placeholder="Project Collaborated_with"
      required
    />
    <input
      type="text"
      name={`project-${index}-technologiesUsed`}
      value={project.technologiesUsed.join(', ')}
      onChange={(e) => handleInputChange(e, index, 'projects', 'technologiesUsed')}
      placeholder="Technologies Used"
    />
    <input
      type="date"
      name={`project-${index}-start`}
      value={project.start}
      onChange={(e) => handleInputChange(e, index, 'projects', 'start')}
      placeholder="Start Date"
    />
    <input
      type="date"
      name={`project-${index}-end`}
      value={project.end}
      onChange={(e) => handleInputChange(e, index, 'projects', 'end')}
      placeholder="End Date"
    />
    
  </div>
))}
<button type="button" onClick={addProject}>
  Add Project
</button>

</div>


  {/* Hobbies */}
  <div className="form-group">
    <label>Hobbies:</label>
    <input type="text" name="hobbies" value={formData.hobbies.join(', ')} onChange={(e) => handleInputChange(e)} />
  </div>

  {/* Education */}
  <div className="form-group">
    <label>Education:</label>
    {formData.education.map((edu, index) => (
  <div key={index} className="education">
    <input
      type="text"
      name={`education-${index}-collegeName`}
      value={edu.collegeName}
      onChange={(e) => handleInputChange(e, index, 'education', 'collegeName')}
      placeholder="College Name"
      required
    />
    <input
      type="text"
      name={`education-${index}-course`}
      value={edu.course}
      onChange={(e) => handleInputChange(e, index, 'education', 'course')}
      placeholder="Course"
    />
    <input
      type="text"
      name={`education-${index}-branch`}
      value={edu.branch}
      onChange={(e) => handleInputChange(e, index, 'education', 'branch')}
      placeholder="Branch"
    />
    <input
      type="text"
      name={`education-${index}-cgpa`}
      value={edu.cgpa}
      onChange={(e) => handleInputChange(e, index, 'education', 'cgpa')}
      placeholder="CGPA"
    />
    <input
      type="date"
      name={`education-${index}-from`}
      value={edu.from}
      onChange={(e) => handleInputChange(e, index, 'education', 'from')}
      placeholder="From"
    />
    <input
      type="date"
      name={`education-${index}-to`}
      value={edu.to}
      onChange={(e) => handleInputChange(e, index, 'education', 'to')}
      placeholder="To"
    />
  </div>
))}

    <button type="button" onClick={addEducation}>Add Education</button>
  </div>

  {/* Experience */}
  <div className="form-group">
    <label>Experience:</label>
    {formData.experience.map((exp, index) => (
  <div key={index} className="experience">
    <input
      type="text"
      name={`experience-${index}-employer`}
      value={exp.employer}
      onChange={(e) => handleInputChange(e, index, 'experience', 'employer')}
      placeholder="Employer"
      required
    />
    <textarea
      name={`experience-${index}-description`}
      value={exp.description}
      onChange={(e) => handleInputChange(e, index, 'experience', 'description')}
      placeholder="Description"
    ></textarea>
    <input
      type="date"
      name={`experience-${index}-start`}
      value={exp.start}
      onChange={(e) => handleInputChange(e, index, 'experience', 'start')}
      placeholder="Start Date"
    />
    <input
      type="date"
      name={`experience-${index}-end`}
      value={exp.end}
      onChange={(e) => handleInputChange(e, index, 'experience', 'end')}
      placeholder="End Date"
    />

    
  </div>
))}

    <button type="button" onClick={addExperience}>Add Experience</button>
  </div>

  <button type="submit">{editingResumeId ? 'Update Resume' : 'Create Resume'}</button>
  
  {/* <div id="resumeTemplate">
  {editingResumeId ? (
    <ResumeTemplate resumeData={formData} />
  ) : null}
  </div> */}
<TemplateSelector resumeData={formData} />
  

</form>

      <ul>
        {resumes.map(resume => (
          <li key={resume._id}>
            <h2>{resume.name}</h2>
            <p>{resume.email}</p>
            <button onClick={() => handleEdit(resume._id)}>Edit</button>
            <button onClick={() => handleDelete(resume._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    
    
  );


return (
  <Router>
    <Routes>
      <Route path="/login" render={(props) => <Login {...props} setAuthenticated={setAuthenticated} />} />
      <Route path="/logout" render={(props) => <Logout {...props} setAuthenticated={setAuthenticated} />} />
      <Route
        path="/protected"
        render={(props) => (authenticated ? <ProtectedComponent {...props} /> : <Login {...props} setAuthenticated={setAuthenticated} />)}
      />
      <Route path="/template" component={TemplateSelector} />
      <Route path="/resumes" component={ResumeList} />
      <Route path="/" component={App1} />
    </Routes>
  </Router>
);


}
export default App;
