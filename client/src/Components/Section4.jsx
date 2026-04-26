import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import useStore from '../store';

function Section4({ page }) {
  const { cv, updateCvArrayItem, addCvArrayItem } = useStore();

  const projects = cv.projects || [];

  const renderProjects = () =>
    projects.map((item, index) => (
      <fieldset key={`project-${index}`} className="form-group border p-2 mt-3">
        <legend className="h5">Project</legend>
        <input
          type="text"
          className="form-control mt-2"
          id="title1"
          placeholder="Project Title"
          required={true}
          autoFocus=""
          name={`title${index}`}
          onChange={(e) => updateCvArrayItem('projects', index, e.target.value, 'title')}
          value={projects[index]?.title || ''}
        />
        <input
          type="text"
          className="form-control mt-2"
          id="title1"
          placeholder="Project Description"
          required={true}
          autoFocus=""
          name={`description${index}`}
          onChange={(e) => updateCvArrayItem('projects', index, e.target.value, 'description')}
          value={projects[index]?.description || ''}
        />
        <input
          type="text"
          className="form-control mt-2"
          id="title1"
          placeholder="Project Link"
          required={true}
          autoFocus=""
          name={`link${index}`}
          onChange={(e) => updateCvArrayItem('projects', index, e.target.value, 'link')}
          value={projects[index]?.link || ''}
        />
      </fieldset>
    ));

  return (
    <>
      <div className={page !== 3 ? 'pgdisplay' : ''}>
        <Accordion>
          <AccordionTab header="Add Projects">
            {renderProjects()}
            <button
              type="button"
              className="btn btn-info mt-1 mb-2"
              id="pbtn"
              onClick={() => addCvArrayItem('projects', { title: '', description: '', link: '' })}
            >
              +
            </button>
          </AccordionTab>
        </Accordion>
      </div>
    </>
  );
}

export default Section4;
