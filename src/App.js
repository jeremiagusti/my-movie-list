import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components 
import Home from './components/Home';
import Portal from './components/portal/Portal';

const App = () => {
  return (
      <Router>
        <div>
          <Route exact path="/" component={Home} />
          <Route path="/portal" component={Portal} />
        </div>
      </Router>
    );    
}

export default App;
