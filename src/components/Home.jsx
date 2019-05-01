import React from 'react'; 
import Navbar from './Navbar';
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
            <div className="container">
                <h1>List of your favorite shows</h1>
                {/* Movie Grid right here! */}
                <button type="button" className="btn btn-primary">Primary</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(Home); 