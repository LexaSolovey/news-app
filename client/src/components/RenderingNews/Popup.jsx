import React, { Component } from 'react';
import { Icon } from 'react-fa';

export default class Popup extends Component {
  constructor(){
    super();
    this.closePopup = this.closePopup.bind(this);
  }

  closePopup(){
    this.props.setValue({popupVisible: false});
  }

  render() {
    return (
      <div className="popup">
          <div className="closePopup" onClick={this.closePopup}>
            <Icon name="times" size = "2x"/>
          </div>
          <div className="popupContent">
          <figure>
              <img 
                src={this.props.itemOfNews.urlToImage} 
                alt={this.props.itemOfNews.title} 
              />
              <figcaption>
                {this.props.itemOfNews.title}
                <a href={this.props.itemOfNews.url}>  read more ...</a>
              </figcaption>
          </figure>
          </div>
      </div>
    );
  }
}

