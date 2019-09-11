import React, { useState, useEffect } from "react";
import { db, getMovieCover } from "../../db/firebase";
import { connect } from "react-redux";
import { getMovieCollection } from "../../actions/movieAction";
import { MovieThumbnail } from "../movie_modal/Thumbnail";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingScreen from "../LoadingScreen";

const Movies = props => {
  let [movieGrid, setMovieGrid] = useState([]);

  useEffect(() => {
    async function getMovieImageCover() {
      let snapshot = await db
        .collection("movies")
        .orderBy("title")
        .get();
      let moviesWithCover = await getMovieCover(snapshot);

      // Set the movieGrid state
      setMovieGrid(moviesWithCover);
    }

    props.getMovieCollection(props.loggedInUserId);
    getMovieImageCover();
  }, []);

  return (
    <Container>
      <h3>Movies</h3>
      {movieGrid.length === 0 ? (
        <LoadingScreen />
      ) : (
        <>
          <Row>
            {movieGrid.map((movie, index) => {
              return (
                <Col className="thumbnail" sm={2} xs={6} key={index}>
                  <MovieThumbnail movie={movie} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </Container>
  );
};

const mapStateToProps = state => {
  return {
    loggedInUserId: state.authReducer.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovieCollection: loggedInUserId => {
      dispatch(getMovieCollection(loggedInUserId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movies);
