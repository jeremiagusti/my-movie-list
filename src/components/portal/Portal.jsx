import React from 'react'; 
import { BrowserRouter as Router, Route } from "react-router-dom";

import MovieGrid from '../MovieGrid';
import MoviesPortal from './Movies';
import TVPortal from './TvShows';
import MyList from './MyList';
import Navbar from '../InNavbar';

const Portal = () => {
  return(
    <Router>
        <Navbar />
        <div>
            <Route exact path="/portal" component={MovieGrid} />
            <Route path="/portal/movies" component={MoviesPortal} />
            <Route path="/portal/tv" component={TVPortal} />
            <Route path="/portal/mylist" component={MyList} />
        </div>
    </Router>
  )
}

export default Portal;