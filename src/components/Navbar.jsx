import React from 'react'; 
import LoginModal from './LoginModal';

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
        <a className="navbar-brand" href="/">Navbar</a>
        <button 
          type="button" 
          class="ml-auto btn btn-primary my-2 mx-2 my-sm-0" 
          data-toggle="modal" 
          data-target="#loginModal">
            Login
        </button>

        <LoginModal handleLogin={props.handleLogin}/>  
    </nav>
  )
}

export default Navbar;