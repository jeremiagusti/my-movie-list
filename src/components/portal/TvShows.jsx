import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getShowCollection } from "../../actions/movieAction";
import { db, getMovieCover } from "../../db/firebase";
import { ShowThumbnail } from "../movie_modal/Thumbnail";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingScreen from "../LoadingScreen";

const TvShows = props => {
  let [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    async function getTVShowsImageCover() {
      let snapshot = await db
        .collection("tv")
        .orderBy("title")
        .get();
      let tvWithCover = await getMovieCover(snapshot);

      // Set the movieGrid state
      setTvShows(tvWithCover);
    }

    props.getShowCollection(props.loggedInUserId);
    getTVShowsImageCover();
  }, []);

  return (
    <Container>
      <h3>TV SHOWS</h3>
      {tvShows.length === 0 ? (
        <LoadingScreen />
      ) : (
        <>
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
    getShowCollection: loggedInUserId => {
      dispatch(getShowCollection(loggedInUserId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TvShows);
