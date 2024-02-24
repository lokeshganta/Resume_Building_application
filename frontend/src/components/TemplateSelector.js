// TemplateSelector.js
import React, { useState } from 'react';
import Template1 from './Template1';
import Template2 from './Template2';
import { useReactToPrint } from 'react-to-print';

const TemplateSelector = ({ resumeData }) => {
  const [selectedTemplate, setSelectedTemplate] = useState('template1');
  const componentRef = React.useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const onDownloadClick = () => {
    // Use the same ref as in useReactToPrint
    const element = componentRef.current;

    if (element) {
      // Trigger the print
      handlePrint();
    }
  };

  const renderSelectedTemplate = () => {
    switch (selectedTemplate) {
      case 'template1':
        return <Template1 resumeData={resumeData} />;
      case 'template2':
        return <Template2 resumeData={resumeData} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <label>Select Template:</label>
        <select onChange={(e) => setSelectedTemplate(e.target.value)}>
          <option value="template1">Template 1</option>
          <option value="template2">Template 2</option>
        </select>
      </div>

      {/* Use the ref to capture the component */}
      <div ref={componentRef}>{renderSelectedTemplate()}</div>

      {/* Use the onDownloadClick function */}
      <button onClick={onDownloadClick}>Download PDF</button>
    </div>
  );
};

export default TemplateSelector;
  