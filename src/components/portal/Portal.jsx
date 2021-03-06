import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logoutAction } from "../../actions/authAction";

import "../../css/thumbnail.css";
import PortalHome from "./PortalHome";
import MoviesPortal from "./Movies";
import TVPortal from "./TvShows";
import MyList from "./MyList";
import Navbar from "./Navbar";
import LoadingScreen from "../LoadingScreen";

const Portal = props => {
  if (!props.isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <Router>
      <Navbar handleLogout={props.handleLogout} username={props.username} />
      <div className="portal container">
        <Route exact path="/portal" component={PortalHome} />
        <Route path="/portal/movies" component={MoviesPortal} />
        <Route path="/portal/tv" component={TVPortal} />
        <Route path="/portal/mylist" component={MyList} />

        <Route path="/portal/spinner" component={LoadingScreen} />
      </div>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
    username: state.authReducer.username
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogout: () => {
      dispatch(logoutAction());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Portal);
