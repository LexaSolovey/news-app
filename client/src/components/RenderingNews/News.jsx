import React, { Component } from 'react';
import { Icon } from 'react-fa';

export default class News extends Component {
  constructor(){
    super();
    this.addLike = this.addLike.bind(this);
  }

  addLike(event){
    event.currentTarget.style.color === 'rgb(9, 34, 192)'
      ? event.currentTarget.style.color = 'rgb(240, 255, 255)'
      : event.currentTarget.style.color = 'rgb(9, 34, 192)';
  }

  openPopup(index){
    this.props.setValue({
      currentItemOfNews: index,
      popupVisible: true,
    });
  }

  render() {
    let classNameItemOfNews = 'itemOfNews';
    const content = this.props.listOfNews.map((item, index) => {
      const ind = index + 1;
      if(
        this.props.listOfNews.length % 2 !== 0 &&
        this.props.listOfNews.length === ind
      ) classNameItemOfNews += ' lastItem';
      return(
        <div key={index} className={classNameItemOfNews}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div>
            <a href={item.url} target="_blank">Read more...</a>
            {' or '} 
            <div className="picture" onClick={this.openPopup.bind(this, index)}>show picture</div>
            <Icon name="thumbs-o-up " size = "lg" onClick={this.addLike}/>
          </div>
        </div>
      );
    });

    return (
      <div className="news">
        {content}
      </div>
    );
  }
}

