import React, { useState, useEffect } from "react";
import { db, getMovieCover } from "../../db/firebase";
import { ShowThumbnail } from "../movie_modal/Thumbnail";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingScreen from "../LoadingScreen";

const PortalHome = () => {
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
    getTVShowsImageCover();
  }, []);

  return (
    <Container>
      {tvShows.length === 0 ? (
        <LoadingScreen />
      ) : (
        <>
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

export default PortalHome;
