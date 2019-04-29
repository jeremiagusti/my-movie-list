import React from 'react'; 
import { Link } from "react-router-dom";

const Navbar = (props) => {
  return (
    <nav className="navbar navbar-expand-md navbar-light">
      <a className="navbar-brand" >Navbar</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/portal">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/portal/movies">Movies</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/portal/tv">TV Shows</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/portal/mylist">My List</Link>
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div>
          <button 
            type="button" 
            className="btn btn-primary my-2 mx-2 my-sm-0">
              {props.username}
          </button>
          <button 
            type="button" 
            className="ml-auto btn btn-danger my-2 mx-2 my-sm-0"
            onClick={props.handleLogout}>
              Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;