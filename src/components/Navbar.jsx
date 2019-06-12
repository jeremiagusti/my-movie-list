import React, { useState } from "react";
import { connect } from "react-redux";
import { loginAction, signUpAction } from "../actions/authAction";
import SignInModal from "./SignInModal";
import SignUpModal from "./SignUpModal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

const Navigation = props => {
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const openModal = e => {
    if (e.target.id === "signInBtn") setShowSignInModal(true);
    else if (e.target.id === "signUpBtn") setShowSignUpModal(true);
  };

  const closeModal = () => {
    setShowSignInModal(false);
    setShowSignUpModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="md">
        <Navbar.Brand href="#home">My Movie List</Navbar.Brand>
        <Nav className="ml-auto">
          <Button
            className="ml-auto my-2 mx-2 my-sm-0"
            variant="primary"
            id="signInBtn"
            onClick={openModal}
          >
            Sign In
          </Button>
          <Button
            className="ml-auto my-2 mx-2 my-sm-0"
            variant="success"
            id="signUpBtn"
            onClick={openModal}
          >
            Sign Up
          </Button>
        </Nav>
      </Navbar>

      <SignInModal
        handleLogin={props.handleLogin}
        showModal={showSignInModal}
        closeModal={closeModal}
      />
      <SignUpModal
        handleSignUp={props.handleSignUp}
        showModal={showSignUpModal}
        closeModal={closeModal}
      />
    </>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: (email, password) => {
      dispatch(loginAction(email, password));
    },
    handleSignUp: (email, password, username) => {
      dispatch(signUpAction(email, password, username));
    }
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Navigation);
