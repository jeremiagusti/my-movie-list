import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';

const SignUp = (props) => {
    const [loadingButton, setLoadingButton] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoadingButton(true);
    
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

                    <Button variant="primary" block={true} disabled={loadingButton} type="submit">
                        {
                            loadingButton ? (
                                <>
                                <Spinner
                                as="span"
                                animation="grow"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                />
                                <p style={{display: "inline"}}>Loading...</p>
                            </>                                
                            ) : (
                                <p style={{display: "inline"}}>Sign Up</p>
                            )
                        }
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default SignUp;
