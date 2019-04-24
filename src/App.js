import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';

// Components 
import Home from './components/Home';
import Portal from './components/portal/Portal';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <Router>
      <div>
        <Route path="/portal" component={Portal} />
        <Route path="/" component={Home} />
      </div>
    </Router>
  );
}

export default App;
