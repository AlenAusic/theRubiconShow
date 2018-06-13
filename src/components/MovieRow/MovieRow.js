/* ---------- [ REACT ] ----------- */
import React from 'react';
/* ---------- [ CSS ] ----------- */
import './MovieRow.css';
/* ---------- [ LIBRARIES ] ----------- */
import { Grid, Row, Col } from 'react-bootstrap/lib';

class MovieRow extends React.Component {
  viewMovie() {
    const url = "/movie/" + this.props.movie.id;
    window.location.href = url;
  }

  render() {
    return (
      <Grid>
        <Row md={12} className="show-grid">
          <Col xs={6} md={4} key={this.props.movie.id} className="movie">
            <a type="buttom" onClick={this.viewMovie.bind(this)}>
              <img alt="poster" width="240" src={this.props.movie.poster_src}/>
            </a>

            <span>
              <br></br>
              
              <h3>{this.props.movie.title}</h3>
            </span>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default MovieRow;