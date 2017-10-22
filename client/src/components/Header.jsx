import React, { Component } from 'react';

import getDate from '../utils/getDate';

class Header extends Component {
  
  render() {
    return (
        <header>
          <div className="nameOfServise">
            <h1>News App</h1>
          </div>
          <p>{getDate()}</p>
        </header>
    );
  }
}

export default Header;
