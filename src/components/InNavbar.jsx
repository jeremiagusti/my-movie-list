import React from 'react'; 
import {  Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-md navbar-light">
      <a class="navbar-brand" >Navbar</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <Link class="nav-link" to="/portal">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/portal/movies">Movies</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/portal/tv">TV Shows</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/portal/mylist">My List</Link>
          </li>
        </ul>
        <form class="form-inline my-2 my-lg-0">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>
        <div>
          <button type="button" class="btn btn-primary my-2 mx-2 my-sm-0">User</button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;