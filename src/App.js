import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

// Components 
import Home from './components/Home';
import Portal from './components/portal/Portal';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    }
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false
    })
  }

  handleLogin = () => {
    this.setState({
      isLoggedIn: true
    })
  }
  
  render () {
    return (
      <Router>
        <div>
          {/* <Route path="/portal" 
            render={(props) => <Portal {...props} 
            isLoggedIn={this.state.isLoggedIn} 
            handleLogout={this.handleLogout} />} 
          /> */}
          <Route exact path="/" component={Home} />
          <Route path="/portal" component={Portal} />

          {/* <Route exact path="/" 
            render={(props) => <Home {...props} 
            isLoggedIn={this.state.isLoggedIn} 
            handleLogin={this.handleLogin} />}  /> */}
        </div>
      </Router>
    );          
  }
}

export default App;
