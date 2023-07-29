import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../asset/css/NotFound.css"

const NotFound = () => (
    <div className="not-found">
      <img
        src="https://res.cloudinary.com/dia5z4i6s/image/upload/v1690345335/movie/nc47w54qzytnesbyvnp4.png"
        alt="not-found"
      />
      <Link to="/" className="link-home">
        Go Home
      </Link>
    </div>
  );
  
  export default NotFound;