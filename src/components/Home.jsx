import React from 'react'; 
import Navbar from './Navbar';

const Home = () => {
    return(
        <div class="home">
            <Navbar />
            <div class="container">
                <h1>List of your favorite shows</h1>
                {/* Movie Grid right here! */}
                <button type="button" class="btn btn-primary">Primary</button>
            </div>
        </div>
    )
}

export default Home; 