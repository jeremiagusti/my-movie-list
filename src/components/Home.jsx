import React from 'react'; 
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Home = (props) => {
    if (props.isLoggedIn) {
        return (
            <Redirect to="/portal" />
        )
    }

    return(
        <div className="home">
            <Navbar />
            <Container>
                <h1>List of your favorite shows</h1>             
            </Container>
        </div>
    )
   
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(Home); 