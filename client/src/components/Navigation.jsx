import React, { Component } from 'react';
import { Icon } from 'react-fa';

export default class Navigation extends Component {
  constructor(){
    super();
    this.state = {
      isOpened : false,
    }
    this.toggleState = this.toggleState.bind(this);
  }

  changeItemPublusher(index){
    this.props.setChosenItemOfPublishers({ publisher: index })
    this.setState({ isOpened: !this.state.isOpened })
  }

  toggleState(){
    this.setState({ isOpened: !this.state.isOpened })
  }

  render() {
    const items = this.props.publishers.map((publisher, index) => {
      let classNameOfItem =  'hidden';
      if(this.state.isOpened) classNameOfItem = '';
      if(this.props.activePublisher === index) classNameOfItem += ' activePublisher';
      return(
        <li 
          key={index} 
          className={classNameOfItem}
          onClick={this.changeItemPublusher.bind(this, index)}
        >
          <p>{publisher.name}</p>
        </li>
      )
    });

    return (
      <nav>
        <div className="openPublishersList" onClick={this.toggleState}>
          <div>
            <p>{this.props.publishers[this.props.activePublisher].name}</p>
            {this.state.isOpened 
              ? <Icon name="angle-up" size = "lg" /> 
              : <Icon name="angle-down" size = "lg" /> }
            
          </div>
        </div>
        <ul>
          {items}
        </ul>
      </nav>
    );
  }
}

