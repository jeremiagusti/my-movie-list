import React, { useState, useEffect } from "react";
import { db, getMovieCoverNonDB } from "../../db/firebase";
import { connect } from "react-redux";
import store from "../../storeConfig";
import {
  getMovieCollection,
  getShowCollection,
  deleteMovieFromCollection
} from "../../actions/movieAction";
import { MovieThumbnail, ShowThumbnail } from "../movie_modal/Thumbnail";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingScreen from "../LoadingScreen";

const MyList = props => {
  let [movieGrid, setMovieGrid] = useState([]);
  let [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    // Get movies and tvShows id and add them to redux states
    props.getMovieCollection(props.loggedInUserId);
    props.getShowCollection(props.loggedInUserId);

    getMovieBasedOnId();
  }, []);

  async function getMovieBasedOnId() {
    let myMovieList = [];
    const moviesIDs = props.moviesInCollection;
    for (let i = 0; i < moviesIDs.length; i++) {
      const dbData = await db
        .collection("movies")
        .doc(moviesIDs[i])
        .get();

      const movie = {
        ...dbData.data(),
        id: moviesIDs[i]
      };

      myMovieList.push(movie);
    }
    const movieWithCover = await getMovieCoverNonDB(myMovieList);
    setMovieGrid(movieWithCover);
  }

  const deleteFromMyListPage = (movieId, userId) => {
    console.log("delete from myList");
    props.deleteMovieFromCollection(movieId, userId);
    console.log("HEHEHEH " + props.moviesInCollection);

    // let myMovieList = [];
    // const moviesIDs = props.moviesInCollection;
    // for (let i = 0; i < moviesIDs.length; i++) {
    //   const dbData = await db
    //     .collection("movies")
    //     .doc(moviesIDs[i])
    //     .get();

    //   const movie = {
    //     ...dbData.data(),
    //     id: moviesIDs[i]
    //   };

    //   myMovieList.push(movie);
    // }
    // const movieWithCover = await getMovieCoverNonDB(myMovieList);
    // setMovieGrid(movieWithCover);
  };

  return (
    <Container>
      {movieGrid.length === 0 || false ? (
        <LoadingScreen />
      ) : (
        <>
          <h1>Movies:</h1>
          <Row>
            {movieGrid.map((movie, index) => {
              return (
                <Col sm={2} xs={6} key={index}>
                  <MovieThumbnail
                    deleteFromMyList={deleteFromMyListPage}
                    movie={movie}
                  />
                </Col>
              );
            })}
          </Row>

          <h1>TV Shows:</h1>
          <Row>
            {tvShows.map((tvshows, index) => {
              return (
                <Col sm={2} xs={6} key={index}>
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
    loggedInUserId: state.authReducer.userId,
    showsInCollection: state.collectionReducer.shows,
    moviesInCollection: state.collectionReducer.movies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovieCollection: loggedInUserId => {
      dispatch(getMovieCollection(loggedInUserId));
    },

    getShowCollection: loggedInUserId => {
      dispatch(getShowCollection(loggedInUserId));
    },

    deleteMovieFromCollection: (movieId, userId) => {
      dispatch(deleteMovieFromCollection(movieId, userId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyList);
