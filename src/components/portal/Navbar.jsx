import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserModal from "./UserModal";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

const Navigation = props => {
  const [showUserModal, setShowUserModal] = useState(false);

  const openModal = () => {
    setShowUserModal(true);
  };

  const closeModal = () => {
    setShowUserModal(false);
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">My Movie List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Item>
              <Link className="nav-link" to="/portal">
                Home
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/portal/movies">
                Movies
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/portal/tv">
                TV Shows
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="nav-link" to="/portal/mylist">
                My List
              </Link>
            </Nav.Item>
          </Nav>
          {/* <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form> */}
          <Button
            className="ml-2 my-sm-2"
            variant="primary"
            onClick={openModal}
          >
            {props.username}
          </Button>
        </Navbar.Collapse>
        <Button
          className="ml-2 my-sm-20"
          variant="danger"
          onClick={props.handleLogout}
        >
          Logout
        </Button>
      </Navbar>

      <UserModal showModal={showUserModal} closeModal={closeModal} />
    </>
  );
};

export default Navigation;
