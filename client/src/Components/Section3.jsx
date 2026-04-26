import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import useStore from '../store';

function Section3({ page }) {
  const { cv, updateCvField, updateCvArrayItem, addCvArrayItem } = useStore();

  const experience = cv.experience || [];

  const renderWorkExp = () =>
    experience.map((item, index) => (
      <fieldset key={`exp-${index}`} className="form-group border p-2 mt-3">
        <legend className="h5">Work Experience</legend>
        <input
          type="date"
          name={`sdate${index}`}
          className="form-control col-sm-4 hori mr-2"
          value={experience[index]?.sdate || ''}
          onChange={(e) => updateCvArrayItem('experience', index, e.target.value, 'sdate')}
        />
        <input
          type="date"
          name={`edate${index}`}
          className="form-control col-sm-4 hori ml-2"
          value={experience[index]?.edate || ''}
          onChange={(e) => updateCvArrayItem('experience', index, e.target.value, 'edate')}
        />
        <input
          type="text"
          className="form-control mt-2"
          id="title1"
          placeholder="Company Name"
          required={true}
          autoFocus=""
          name={`company${index}`}
          onChange={(e) => updateCvArrayItem('experience', index, e.target.value, 'company')}
          value={experience[index]?.company || ''}
        />
        <input
          type="text"
          className="form-control mt-2"
          id="title1"
          placeholder="Position"
          required={true}
          autoFocus=""
          name={`position${index}`}
          onChange={(e) => updateCvArrayItem('experience', index, e.target.value, 'position')}
          value={experience[index]?.position || ''}
        />
      </fieldset>
    ));

  return (
    <>
      <div className={page !== 2 ? 'pgdisplay' : ''}>
        <Accordion multiple>
          <AccordionTab header="About">
            <textarea
              rows="3"
              className="form-control"
              id="about"
              placeholder="About"
              required={true}
              autoFocus=""
              name="about"
              onChange={(e) => updateCvField('about', e.target.value)}
              value={cv.about}
            />
          </AccordionTab>
          <AccordionTab header="Education">
            <fieldset className="form-group border p-2 mt-3">
              <legend className="h5">Education</legend>
              <input
                type="date"
                name="collegesdate"
                className="form-control col-sm-4 hori mr-2"
                value={cv.collegesdate}
                onChange={(e) => updateCvField('collegesdate', e.target.value)}
              />
              <input
                type="date"
                name="collegeedate"
                className="form-control col-sm-4 hori ml-2"
                value={cv.collegeedate}
                onChange={(e) => updateCvField('collegeedate', e.target.value)}
              />
              <input
                type="text"
                className="form-control mt-2"
                id="title1"
                placeholder="CPI"
                required={true}
                autoFocus=""
                name="cpi"
                onChange={(e) => updateCvField('cpi', e.target.value)}
                value={cv.cpi}
              />
              <input
                type="text"
                className="form-control mt-2"
                id="title1"
                placeholder="College Name"
                required={true}
                autoFocus=""
                name="cname"
                onChange={(e) => updateCvField('cname', e.target.value)}
                value={cv.cname}
              />
            </fieldset>
          </AccordionTab>
          <AccordionTab header="Work Experience">
            {renderWorkExp()}
            <button
              type="button"
              className="btn btn-info mt-1 mb-2"
              id="pbtn"
              onClick={() =>
                addCvArrayItem('experience', {
                  company: '',
                  position: '',
                  sdate: '',
                  edate: '',
                })
              }
            >
              +
            </button>
          </AccordionTab>
        </Accordion>
      </div>
    </>
  );
}

export default Section3;
