import React from "react";
import { connect } from "react-redux";
import Modal from "react-bootstrap/Modal";

const UserModal = props => {
  return (
    <div className="userModal">
      <Modal show={props.showModal} onHide={props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Username: {props.username}</p>
          <p>Email: {props.email}</p>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    username: state.authReducer.username,
    email: state.authReducer.email
  };
};

export default connect(mapStateToProps)(UserModal);
