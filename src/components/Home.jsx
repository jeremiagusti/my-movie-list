import React from "react";
import Navbar from "./Navbar";
import Container from "react-bootstrap/Container";
import "../css/home.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Home = props => {
  if (props.isLoggedIn) {
    return <Redirect to="/portal" />;
  }

  return (
    <div className="home">
      <Navbar />
      <Container>
        <h1>Welcome to Netflix</h1>
        <h2>List of your favorite shows</h2>
      </Container>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn
  };
};

export default connect(mapStateToProps)(Home);
