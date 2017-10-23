import React, { Component } from 'react';

import NotFound from '../massages/NotFound';
import Failed from '../massages/Failed';
import Popup from './Popup';
import News from './News';

class RenderingNews extends Component {
  constructor(props){
    super(props);
    this.state = {
      popupVisible: false,
      currentItemOfNews: 0,
    }
    this.setValue = this.setValue.bind(this);
  }

  setValue (item) {
      this.setState({ popupVisible: item.popupVisible, currentItemOfNews: item.currentItemOfNews })
  }
  
  render() {
    let content,
        popup;
    if(!this.props.requestFailed){
      if(this.props.listOfNews.length !== 0) {
        popup = 
          <Popup 
            itemOfNews = {this.props.listOfNews[this.state.currentItemOfNews]}
            setValue={this.setValue}
          />;
        content = 
          <News 
            listOfNews = {this.props.listOfNews}
            setValue={this.setValue}
          />;
      } else if(this.props.filterNews !== '') content = <NotFound />;
    } else content = <Failed />

    return (
      <div className="newsReturnWrapper">
          {this.state.popupVisible ? popup : null}
          {content}
      </div>
    );
  }
}

export default RenderingNews;
