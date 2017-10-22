import React, { Component } from 'react';
import { Icon } from 'react-fa';

class RenderingNews extends Component {
  constructor(props){
    super(props);
    this.state = {
      popupVisible: false,
      currentItemOfNews: 0,
    }
    this.addLike = this.addLike.bind(this);
    this.closePicture = this.closePicture.bind(this);
  }
  
  addLike(event){
    event.currentTarget.style.color === 'rgb(9, 34, 192)'
      ? event.currentTarget.style.color = 'rgb(240, 255, 255)'
      : event.currentTarget.style.color = 'rgb(9, 34, 192)'
  }

  showPicture(index){
      this.setState({
        currentItemOfNews: index,
        popupVisible: !this.state.popupVisible,
      })
  }
  
  closePicture(){
    this.setState({ popupVisible: !this.state.popupVisible })
  }
  
  render() {
    let content,
        popup,
        classNameItemOfNews = 'itemOfNews';

    if(this.props.listOfNews.length > 0){
      popup = 
        <div className="popup">
          <div className="closePopup" onClick={this.closePicture}>
            <Icon name="times" size = "2x"/>
          </div>
          <div className="popupContent">
          <figure>
            <img 
              src={this.props.listOfNews[this.state.currentItemOfNews].urlToImage} 
              alt={this.props.listOfNews[this.state.currentItemOfNews].title} 
            />
            <figcaption>
              {this.props.listOfNews[this.state.currentItemOfNews].title}
              <a href={this.props.listOfNews[this.state.currentItemOfNews].url}>  read more ...</a>
            </figcaption>
          </figure>
          </div>
        </div>;
    }

    if(!this.props.requestFailed){
      content = this.props.listOfNews.map((item, index) => {
        const ind = index + 1
        if(
          this.props.listOfNews.length % 2 !== 0 &&
          this.props.listOfNews.length === ind
        ) classNameItemOfNews += ' lastItem';
        return(
          <div key={index} className={classNameItemOfNews}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div>
              <a href={item.url} target="_blank">Read more... </a>
              <div className="picture" onClick={this.showPicture.bind(this, index)}> <p>or</p> show picture</div>
              <Icon name="thumbs-o-up " size = "lg" onClick={this.addLike}/>
            </div>
          </div>
        );
      });

      if(this.props.filterNews !== '' && content.length === 0) {
        content =       
          <div className="massage">
            <h2>No matches found</h2>
          </div>;
      }
    } else {
      content = 
        <div className="massage">
          <h2>Failed!</h2>
        </div>;
    }

    return (
      <div className="newsReturnWrapper">
        {this.state.popupVisible ? popup : false}
        <div className="news">
          {content}
        </div>
      </div>
    );
  }
}

export default RenderingNews;
