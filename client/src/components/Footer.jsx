import React, { Component } from 'react';

export default class Footer extends Component {
  
  render() {
    return (
        <footer>
          <p>Views today: {this.props.visitsToday.viewsOfPage}</p>
          <div className="developerInfo">
            <h4>Developed by: <span>Aleksey Androsuk</span></h4>
            <h4>Contact: <span>xoxach5@gmail.com</span></h4>
          </div>
        </footer>
    );
  }
}

