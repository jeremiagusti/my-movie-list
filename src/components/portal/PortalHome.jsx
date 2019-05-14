import React, { useState, useEffect } from "react";
import { db, getMovieCover } from "../../db/firebase";
import { MovieThumbnail, ShowThumbnail } from "../movie_modal/Thumbnail";
import { getMovieCollection } from "../../actions/movieAction";
import { connect } from "react-redux";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingScreen from "../LoadingScreen";

const PortalHome = props => {
  let [movieGrid, setMovieGrid] = useState([]);
  let [tvShows, setTvShows] = useState([]);

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

    async function getTVShowsImageCover() {
      let snapshot = await db
        .collection("tv")
        .orderBy("title")
        .get();
      let tvWithCover = await getMovieCover(snapshot);

      // Set the movieGrid state
      setTvShows(tvWithCover);
    }

    props.getMovieCollection(props.loggedInUserId);
    getMovieImageCover();
    getTVShowsImageCover();
  }, []);

  return (
    <Container>
      {movieGrid.length === 0 || tvShows.length === 0 ? (
        <LoadingScreen />
      ) : (
        <>
          <h1>Movies:</h1>
          <Row>
            {movieGrid.map((movie, index) => {
              return (
                <Col sm={2} xs={6} key={index}>
                  <MovieThumbnail movie={movie} />
                </Col>
              );
            })}
          </Row>

          <h1>TV Shows:</h1>
          <Row>
            {tvShows.map((tvshows, index) => {
              return (
                <Col sm={2} xs={6} key={index}>
                  <ShowThumbnail movie={tvshows} />
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
)(PortalHome);
