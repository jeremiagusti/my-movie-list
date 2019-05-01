import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const SignUp = (props) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    
        let email = document.getElementById("email").value; 
        let password = document.getElementById("password").value;   
        let username = document.getElementById("username").value;   

        props.handleSignUp(email, password, username);        
    }

    return (
        <Modal show={props.showModal} onHide={props.closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Sign Up</Modal.Title>
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

                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter username" id="username" required/>
                    </Form.Group>

                    <Button variant="primary" block={true} type="submit" >
                        Sign Up
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SignUp;
