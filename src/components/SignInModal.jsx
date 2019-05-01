import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignIn = (props) => {
    if (props.wrongCred === true) {
        // Future update: 
        // Don't use alert.. make this nicer, like message on the modal
        alert("Wrong email or password");
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";   
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let email = document.getElementById("email").value; 
        let password = document.getElementById("password").value;   
        props.handleLogin(email, password);        
    }

    return (
        <Modal show={props.showModal} onHide={props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control required type="email" placeholder="Enter email" id="email" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" id="password" required/>
                    </Form.Group>

                    <Button variant="primary" block={true} type="submit" >
                        Log In
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

const mapStateToProps = (state) => {
    return {
        wrongCred: state.authReducer.wrongCred
    }
}

export default connect(mapStateToProps)(SignIn);

