import React, { useState, useEffect } from 'react'; 
import { db, getMovieCover } from '../../db/firebase';
import MovieThumbnail from '../movie_modal/MovieThumbnail';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PortalHome = () => {    
  let [movieGrid, setMovieGrid] = useState([]);

    useEffect(() => {
        async function getMovieImageCover() {
            let snapshot = await db.collection("movies").orderBy("title").get(); 
            let moviesWithCover = await getMovieCover(snapshot);

            // Set the movieGrid state
            setMovieGrid(moviesWithCover);
        };
        getMovieImageCover();         
    }, []);

    return (
        <Container>
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
    )
}

export default PortalHome;