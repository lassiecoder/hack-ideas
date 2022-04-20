import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Materialize from 'materialize-css';

import Select from 'react-select';

import dateFormat from 'dateformat';
const now = new Date();

// Basic usage

// Saturday, June 9th, 2007, 5:46:21 PM

const options = [
  { value: 'frontend_developer', label: 'Frontend Developer' },
  { value: 'backend_developer', label: 'Backend Developer' },
  { value: 'fullstack_developer', label: 'Fullstack Developer' },
  { value: 'mobile_app_developer', label: 'Mobile App Developer' },
  { value: 'project_manager', label: 'Project Manager' },
  {
    value: 'information_security_analyst',
    label: 'Information Security Analyst'
  }
];

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#26a69a' : '#26a69a',
    backgroundColor: state.isSelected ? '#f4f8f8' : 'white'
  }),
  control: () => ({
    width: 'auto',
    backgroundColor: '#f9f9f9',
    display: 'flex'
  })
};

const Challenges = () => {
  const histosy = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  console.log({ selectedOption: selectedOption?.value }, '---selectedOption');

  // const todayDate = new Date().toISOString().slice(0, 10);
  const formattedDate = dateFormat(now, 'dddd, mmmm dS, yyyy');
  console.log(formattedDate, '----------  datee');

  const handleCreateChallenge = () => {
    console.log({
      title: title,
      date: formattedDate,
      description: description,
      selectedOption: selectedOption?.label
    });

    fetch('/create-challenge', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        date: formattedDate,
        description,
        recommendedFor: selectedOption?.label
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          Materialize.toast({
            html: data.error,
            classes: '#e53935 red darken-1'
          });
        } else {
          Materialize.toast({
            // html: data.message,
            html: 'Challenge created!',
            classes: '#43a047 green darken-1'
          });
          histosy.push('/');
        }
      });
  };

  return (
    <div>
      <div
        style={{
          width: '30%',
          margin: '100px auto',
          padding: '40px 60px',
          boxShadow: '3px 6px 24px rgba(0,0,0,0.1)',
          borderRadius: '10px'
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px'
            }}
          >
            <div style={{ fontWeight: 600 }}>Recommended for: </div>

            <div style={{ width: '60%' }}>
              <Select
                className="dropdown"
                styles={customStyles}
                options={options}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                components={{
                  DropdownIndicator: () => null,
                  IndicatorSeparator: () => null
                }}
                // styles={{}}
              />
            </div>
          </div>
        </div>

        <div class="row">
          <form class="col s12">
            <div class="row">
              <div class="input-field col s12">
                <input
                  id="input_text"
                  type="text"
                  data-length="10"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
                <label for="input_text">Company name and place</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <textarea
                  id="textarea2"
                  class="materialize-textarea"
                  data-length="120"
                  style={{ height: '100px' }}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                ></textarea>
                <label for="textarea2">Job description</label>
              </div>
            </div>
          </form>
        </div>

        {/* <button onClick={() => handleCreateChallenge()}>create</button> */}
        <div style={{ textAlign: 'center', margin: '30px 0 0 0' }}>
          {/* <button style={{padding:"10px 16px", border: 0}}>CREATE</button> */}
          <a
            class="waves-effect waves-light btn"
            onClick={() => handleCreateChallenge()}
            // style={{ zIndex: -1 }}
          >
            CREATE
          </a>
        </div>
      </div>
    </div>
  );
};
export default Challenges;
