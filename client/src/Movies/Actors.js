import React from 'react';
import { Route, Link } from 'react-router-dom';

export default props => {
  return (
    <div className="movie-star">
      {props.stars.map(star => (
        <div key={star} className="movie-star">
          {star}
        </div>
      ))}
    </div>
  );
};
