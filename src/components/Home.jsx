import React, { useState, useEffect } from 'react'; 
import { db, getImageCover } from '../db/firebase';
import Navbar from './Navbar';
import MovieThumbnail from './movie_modal/MovieThumbnail';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieModal from './movie_modal/MovieModal';


// Notes 
// How to toggle appropriate movie modal? 
// 1. Select the element using its id 
// 2. Change the attribute using javascript 

const Home = (props) => {
    let [movieGrid, setMovieGrid] = useState([]);

    useEffect(() => {
        db.collection("movies").orderBy("year_released", "desc").limit(6).get()
        .then(snapshot => {
            getImageCover(snapshot, 6)
            .then((array) => {
                setMovieGrid(array);
            })
        })
    }, []);

    if (props.isLoggedIn) {
        return (
            <Redirect to="/portal" />
        )
    }

    return(
        <div className="home">
            <Navbar />
            <div className="container">
                <h1>List of your favorite shows</h1>
                {
                    movieGrid.map((movie, index) => {
                        return <MovieThumbnail img={movie.coverURL} key={index} />
                    })
                }

                <button onClick={() => console.log(movieGrid)} type="button" className="btn btn-primary">Primary</button>
            </div>
        </div>
    )
   
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(Home); 