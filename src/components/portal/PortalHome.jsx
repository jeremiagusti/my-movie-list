import React, { useState, useEffect } from "react";
import { db, getMovieCover } from "../../db/firebase";
import { MovieThumbnail, ShowThumbnail } from "../movie_modal/Thumbnail";
import {
  getMovieCollection,
  getShowCollection
} from "../../actions/movieAction";
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
      console.log(movieGrid);
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
    props.getShowCollection(props.loggedInUserId);
    getMovieImageCover();
    getTVShowsImageCover();
  }, []);

  return (
    <Container>
      {movieGrid.length === 0 || tvShows.length === 0 ? (
        <LoadingScreen />
      ) : (
        <>
          <h3>Movies</h3>
          <Row>
            {movieGrid.map((movie, index) => {
              return (
                <Col className="thumbnail" sm={2} xs={6} key={index}>
                  <MovieThumbnail movie={movie} />
                </Col>
              );
            })}
          </Row>
          <hr />
          <h3>TV Shows</h3>
          <Row>
            {tvShows.map((tvshows, index) => {
              return (
                <Col className="thumbnail" sm={2} xs={6} key={index}>
                  <ShowThumbnail show={tvshows} />
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
    },

    getShowCollection: loggedInUserId => {
      dispatch(getShowCollection(loggedInUserId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PortalHome);
