import React from "react";
import { connect } from "react-redux";
import store from "../../storeConfig";
import { MovieThumbnail, ShowThumbnail } from "../movie_modal/Thumbnail";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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
    this.setState({ movieGrid: this.props.moviesInCollection });
  };

  render() {
    return (
      <Container>
        <h3>Movies</h3>
        <Row>
          {this.state.movieGrid.length === 0 ? (
            <h2>You have no movie in your collection</h2>
          ) : (
            this.state.movieGrid.map((movie, index) => {
              return (
                <Col className="thumbnail" sm={2} xs={6} key={index}>
                  <MovieThumbnail movie={movie} />
                </Col>
              );
            })
          )}
        </Row>
        <hr />
        <h3>TV SHOWS</h3>
        <Row>
          {this.state.showGrid.length === 0 ? (
            <h2>You have no show in your collection</h2>
          ) : (
            this.state.showGrid.map((show, index) => {
              return (
                <Col className="thumbnail" sm={2} xs={6} key={index}>
                  <ShowThumbnail show={show} />
                </Col>
              );
            })
          )}
        </Row>
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
