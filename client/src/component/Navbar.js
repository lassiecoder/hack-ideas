import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../App';

import Modal from 'react-modal';

import { FaUserCircle } from 'react-icons/fa';

const customStyles = {
  content: {
    top: '8vh',
    left: '87vw',
    right: 'auto',
    bottom: 'auto'
  }
};

const ProfileModal = ({ onClick }) => {
  const { state } = useContext(UserContext);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <FaUserCircle
        style={{ color: '#26a69a', fontSize: '40px', marginTop: '10px' }}
        onClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <div style={{ paddingBottom: '13px' }}>
          <div className="username">{state?.name}</div>
          <div className="username">
            <Link to="/create-challenge" style={{ color: '#000000' }}>
              My challenges
            </Link>
          </div>
        </div>
        <button
          className="waves-effect waves-light btn #c62828 red darken-3"
          onClick={onClick}
        >
          Logout
        </button>
      </Modal>
    </div>
  );
};

const renderList = (state, dispatch, history) => {
  const _handleLogout = () => {
    localStorage.clear();
    dispatch({ type: 'CLEAR' });
    history.push('/signin');
    console.log('clicked');
  };

  if (state) {
    return <ProfileModal onClick={() => _handleLogout()} />;
  } else {
    return (
      <React.Fragment>
        <li>
          <Link to="/signin">Sign In</Link>
        </li>
        ,
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </React.Fragment>
    );
  }
};

const Navbar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  console.log(state?.name, '---state');

  return (
    <div className="navbar-fixed">
      <nav>
        <div className="nav-wrapper white">
          <Link to={state ? '/' : '/signin'} className="brand-logo left">
            <b> Hack </b> <span> Ideas </span>
          </Link>
          <ul id="nav-mobile" className="right">
            {renderList(state, dispatch, history)}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
