import React from 'react';
import { Accordion, AccordionTab } from 'primereact/accordion';
import useStore from '../store';

const Section2 = ({ page }) => {
  const { cv, updateCvArrayItem, addCvArrayItem } = useStore();

  const renderInput = (category) => {
    const values = cv[category] || [];

    return values.map((item, index) => (
      <input
        key={`${category}-${index}`}
        type="text"
        className="form-control"
        id="title1"
        placeholder={`Enter ${category}`}
        required={true}
        autoFocus=""
        name={`${category}${index}`}
        onChange={(e) => updateCvArrayItem(category, index, e.target.value)}
        value={values[index]}
      />
    ));
  };

  return (
    <>
      <div className={page !== 1 ? 'pgdisplay inputdiv' : 'inputdiv'}>
        <Accordion multiple>
          <AccordionTab header="Skills">
            {renderInput('skills')}
            <button
              type="button"
              className="btn btn-info mt-1 mb-2"
              id="pbtn"
              onClick={() => addCvArrayItem('skills', '')}
            >
              +
            </button>
          </AccordionTab>
          <AccordionTab header="Certificates">
            {renderInput('certificates')}
            <button
              type="button"
              className="btn btn-info mt-1 mb-2"
              id="pbtn"
              onClick={() => addCvArrayItem('certificates', '')}
            >
              +
            </button>
          </AccordionTab>
          <AccordionTab header="Achievements">
            {renderInput('achievements')}
            <button
              type="button"
              className="btn btn-info mt-1 mb-2"
              id="pbtn"
              onClick={() => addCvArrayItem('achievements', '')}
            >
              +
            </button>
          </AccordionTab>
        </Accordion>
      </div>
    </>
  );
};

export default Section2;
