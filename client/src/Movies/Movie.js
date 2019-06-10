import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link, NavLink } from 'react-router-dom';

import Actors from './Actors';

export default class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      hiddenToggle: true
    };
  }

  componentDidMount() {
    // change this line to grab the id passed on the URL

    var id = this.props.match.params.id;
    this.fetchMovie(id);
    console.log(id, 'test');
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        this.setState(() => ({ movie: response.data }));
      })
      .catch(error => {
        console.error(error);
      });
  };
  // Uncomment this code when you're ready for the stretch problems
  // componentWillReceiveProps(newProps){
  //   if(this.props.match.params.id !== newProps.match.params.id){
  //     this.fetchMovie(newProps.match.params.id);
  //   }
  // }

  // saveMovie = () => {
  //   const addToSavedList = this.props.addToSavedList;
  //   addToSavedList(this.state.movie)
  // }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
    const toggleActors = e => {
      e.preventDefault();
      this.history.push('/movies/:id');
    };
    const { title, director, metascore, stars, id } = this.state.movie;
    return (
      <div className="save-wrapper">
        <div className="movie-card">
          <h2>{title}</h2>
          <div className="movie-director">
            Director: <em>{director}</em>
          </div>
          <div className="movie-metascore">
            Metascore: <strong>{metascore}</strong>
          </div>
          <nav className="movie-star">
            <NavLink to={`/movies/${id}/actors`} onClick={this.toggleActors}>
              <h3>Actors</h3>
            </NavLink>
          </nav>

          <Route exact path="/movies/:id" />

          {this.state.toggle && <Route exact path="/movies/:id" />}

          <Route
            exact
            path="/movies/:id/actors"
            render={props => <Actors {...props} stars={stars} />}
          />

          {/* {stars.map(star => (
            <div key={star} className="movie-star">
              {star}
            </div>
          ))} */}
        </div>
        <div className="save-button">Save</div>
      </div>
    );
  }
}
