import React, { useState, useEffect } from 'react'; 
import { db, getImageCover } from '../db/firebase';
import Navbar from './Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import MovieThumbnail from './movie_modal/MovieThumbnail';

const Home = (props) => {
    let [movieGrid, setMovieGrid] = useState([]);

    useEffect(() => {
        db.collection("movies").orderBy("year_released").limit(6).get()
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
            <Container>
                <h1>List of your favorite shows</h1>
                <Row>
                {
                    movieGrid.map((movie, index) => {
                        return <Col sm={2} xs={6} key={index} >
                            <MovieThumbnail 
                                movie={movie} 
                            />
                        </Col>
                    })
                }
                </Row>                
            </Container>
        </div>
    )
   
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.authReducer.isLoggedIn
    }
}

export default connect(mapStateToProps)(Home); 