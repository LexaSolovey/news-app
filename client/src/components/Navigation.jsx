import React, { Component } from 'react';

export default class Navigation extends Component {

  changeItemPublusher(index){
    this.props.setChosenItemOfPublishers({ publisher: index })
  }
  
  render() {
    return (
      <nav>
        <ul>
          {this.props.publishers.map((publisher, index) => (
              <li 
                key={index} 
                className={this.props.activePublisher === index ? 'activePublisher' : null}
                onClick={this.changeItemPublusher.bind(this, index)}
              >
                <p>{publisher.name}</p>
              </li>
          ))}
        </ul>
      </nav>
    );
  }
}

