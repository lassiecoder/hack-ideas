import React from 'react';

const ChallengeDetails = () => {
  return (
    <div>
      <div className="mainContainer">
        <div className="createdDate">{localStorage.getItem('date')}</div>

        <div className="recmdFor">{localStorage.getItem('recommendedFor')}</div>

        <div className="challengeTitle">{localStorage.getItem('title')}</div>

        <div className="challengeDesc">
          {localStorage.getItem('description')}
        </div>
      </div>
    </div>
  );
};
export default ChallengeDetails;
