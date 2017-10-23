import React, { Component } from 'react';

import getDate from '../utils/getDate';

class Header extends Component {
  constructor(){
    super();
    this.reRenderPage = this.reRenderPage.bind(this);
  }

  reRenderPage(){
    this.props.setChosenItemOfPublishers({ publisher: 0 })
  }
  
  render() {
    return (
        <header>
          <div className="nameOfServise" onClick = {this.reRenderPage}>
            <h1>News App</h1>
          </div>
          <p>{getDate()}</p>
        </header>
    );
  }
}

export default Header;
