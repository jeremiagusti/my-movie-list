import React from "react";
import { connect } from "react-redux";
import store from "../../storeConfig";
import { MovieThumbnail, ShowThumbnail } from "../movie_modal/Thumbnail";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LoadingScreen from "../LoadingScreen";

class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieGrid: props.moviesInCollection,
      showGrid: props.showsInCollection
    };
  }

  componentDidMount() {
    store.subscribe(this.update);
  }

  update = () => {
    console.log(this.props.moviesInCollection);
    this.setState({ movieGrid: this.props.moviesInCollection });
  };

  render() {
    return (
      <Container>
        {this.state.movieGrid.length === 0 || false ? (
          <LoadingScreen />
        ) : (
          <>
            <h1>Movies:</h1>
            <Row>
              {this.state.movieGrid.map((movie, index) => {
                return (
                  <Col sm={2} xs={6} key={index}>
                    <MovieThumbnail movie={movie} />
                  </Col>
                );
              })}
            </Row>

            <h1>TV Shows:</h1>
            <Row>
              {this.state.showGrid.map((show, index) => {
                return (
                  <Col sm={2} xs={6} key={index}>
                    <ShowThumbnail show={show} />
                  </Col>
                );
              })}
            </Row>
          </>
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedInUserId: state.authReducer.userId,
    showsInCollection: state.collectionReducer.shows,
    moviesInCollection: state.collectionReducer.movies
  };
};

export default connect(mapStateToProps)(MyList);
