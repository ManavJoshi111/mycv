import React from 'react';
import useStore from '../store';

function Section1({ page }) {
  const { cv, updateCvField } = useStore();

  return (
    <>
      <div className={page !== 0 ? 'pgdisplay' : ''}>
        <input
          type="text"
          className="form-control"
          id="firstinput"
          placeholder="Full Name"
          required={true}
          autoFocus=""
          name="name"
          onChange={(e) => updateCvField('name', e.target.value)}
          value={cv.name}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Email Address"
          readOnly
          required={true}
          autoFocus=""
          name="email"
          onChange={(e) => updateCvField('email', e.target.value)}
          value={cv.email}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Contact"
          required={true}
          autoFocus=""
          name="number"
          onChange={(e) => updateCvField('number', e.target.value)}
          value={cv.number}
        />
        <input
          type="text"
          className="form-control"
          name="address"
          placeholder="Address"
          required={true}
          autoFocus=""
          onChange={(e) => updateCvField('address', e.target.value)}
          value={cv.address}
        />
        <input
          type="text"
          className="form-control"
          name="portfolio"
          placeholder="Portfolio/Personal Website complete URL"
          required={true}
          autoFocus=""
          onChange={(e) => updateCvField('portfolio', e.target.value)}
          value={cv.portfolio}
        />
        <input
          type="text"
          className="form-control"
          name="github"
          placeholder="Github Username"
          required={true}
          autoFocus=""
          onChange={(e) => updateCvField('github', e.target.value)}
          value={cv.github}
        />
      </div>
    </>
  );
}

export default Section1;
