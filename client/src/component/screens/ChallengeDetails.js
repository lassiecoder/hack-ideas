import React from 'react';

const ChallengeDetails = () => {
  return (
    <div>
      <div
        style={{
          width: '60%',
          margin: '100px auto',
          padding: '40px 60px',
          boxShadow: '3px 6px 24px rgba(0,0,0,0.1)',
          borderRadius: '10px'
        }}
      >
        <div
          style={{
            fontSize: '12px',
            color: '#26a69a'
          }}
        >
          {localStorage.getItem('date')}
        </div>

        <div
          style={{
            fontSize: '22px',
            fontWeight: 700,
            color: '#26a69a'
          }}
        >
          {localStorage.getItem('recommendedFor')}
        </div>

        <div
          style={{
            fontSize: '12px',
            fontWeight: 600,
            color: '#a7a7a7',
            marginTop: '1%'
          }}
        >
          {localStorage.getItem('title')}
        </div>

        <div
          style={{
            fontSize: '16px',
            fontWeight: 600,
            color: '#a7a7a7',
            marginTop: '4%'
          }}
        >
          {localStorage.getItem('description')}
        </div>
      </div>
    </div>
  );
};
export default ChallengeDetails;
