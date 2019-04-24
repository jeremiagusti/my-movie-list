import React from 'react'; 
import Navbar from './Navbar';

const Home = () => {
  return(
    <div class="home">
      <Navbar />
      <div className="container">
        <h1>Input movies to your list</h1>
      </div>
    </div>
  )
}

export default Home;