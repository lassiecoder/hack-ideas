import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlusCircle } from 'react-icons/ai';

const Home = () => {
  const [challengesList, setChallengesList] = useState([]);
  useEffect(() => {
    fetch('/challenges-list', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('jwt')
      }
    })
      .then(res => res.json())
      .then(result => {
        // console.log({ result });
        setChallengesList(result.challengesList);
      });
  }, []);

  console.log({ challengesList });

  const handleChallengeDetails = (title, date, description, recommendedFor) => {
    localStorage.setItem('date', date);
    localStorage.setItem('title', title);
    localStorage.setItem('recommendedFor', recommendedFor);
    localStorage.setItem('description', description);
  };

  return (
    <div>
      <Link to="/create-challenge" className="createChallenge">
        <div style={{ fontSize: '20px' }}>Create new challenge</div>
        <div>
          <AiOutlinePlusCircle
            style={{ fontSize: '30px', marginLeft: '6px' }}
          />
        </div>
      </Link>
      <div>
        <div style={{ margin: '0% 5.5% 3% 5.5%' }}>
          <div className="mainCard">
            {challengesList.map(
              ({ title, recommendedFor, date, description }) => {
                return (
                  <div className="cardContainer">
                    <div style={{ flex: 1 }}>
                      <div className="cardRecommend">{recommendedFor}</div>
                      <div className="cardTitle">{title}</div>
                    </div>

                    <div style={{ marginTop: '20px' }}>
                      <Link
                        to={{
                          pathname: '/challenge-details'
                        }}
                        style={{ color: 'white', fontWeight: 600 }}
                      >
                        <a
                          class="waves-effect waves-light btn btn-small"
                          onClick={() =>
                            handleChallengeDetails(
                              title,
                              date,
                              description,
                              recommendedFor
                            )
                          }
                        >
                          Know More
                        </a>
                      </Link>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Home;
