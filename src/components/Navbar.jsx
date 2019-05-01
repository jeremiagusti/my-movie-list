import React, { useState } from 'react'; 
import { connect } from 'react-redux';
import { loginAction } from '../actions/authAction';
import LoginModal from './LoginModal';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';

const Navigation = (props) => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Button className="ml-auto my-2 mx-2 my-sm-0" variant="primary" onClick={openModal}>Login</Button>
      </Navbar>

      
      <LoginModal handleLogin={props.handleLogin} showModal={showModal} closeModal={closeModal} />  
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
      handleLogin: (email, password) => {
          dispatch(loginAction(email, password))
      },
  }
}

export default connect(null, mapDispatchToProps)(Navigation);