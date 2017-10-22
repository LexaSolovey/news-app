import React, { Component } from 'react';

import '../styles/index.css';

import RenderingNews from './RenderingNews';

import { connect } from 'react-redux';

import getDate from '../utils/getDate';
import { fetchNewsData, fetchCountVisitsOfPage } from '../utils/Api';
import filterContentNews from '../utils/searchNews';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focused: false,
      requestFailed: false,
      visitsToday: [],
    }
    this.onFocusInput = this.onFocusInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.findNews = this.findNews.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  onFocusInput() {
    this.setState({focused: true});
  }

  onBlurInput() {
    this.setState({focused: false});
  }

  findNews(event){
    this.props.onFindNews(event.target.value);
  }

  handleInputChange(event) {
    this.props.onFindNews(event.target.value);
  }

  changeItemPublusher(index) {
    this.props.changePublusher(index);
    this.getNewsData(this.props.publishers[index].apiCode);
  }

  getNewsData(publisher){
    fetchNewsData(publisher)
    .then(
      ({listOfNews}) => this.props.newsDataToState(listOfNews.data.articles),
      (error) => {
        this.setState({requestFailed: true});
        throw error;
      }
    );
  }

  componentDidMount() {
    this.getNewsData(this.props.publishers[this.props.activePublisher].apiCode);
    fetchCountVisitsOfPage().then(visits => this.setState({ visitsToday: visits }));
  }

  render() {
    let classNames = {
      sectionSearch: 'sectionSearch',
      inputSubmit: 'inputSubmit',
    }
    
    if(this.state.focused) {
      classNames.sectionSearch += ' sectionOnFocus';
      classNames.inputSubmit += " inputOnFocus";
    }

    return (
      <div className="App">
        <header>
          <div className="nameOfServise">
            <h1>News App</h1>
          </div>
          <p>{getDate()}</p>
        </header>
        <section className={classNames.sectionSearch}>
          <form  onSubmit={this.handleSubmit}>
            <input 
              type="text"
              onChange={this.findNews}
              onFocus={this.onFocusInput}
              onBlur={this.onBlurInput} />
              <input className={classNames.inputSubmit}
              type="submit" value="" 
            />
          </form>
        </section>
        <nav>
          <ul>
            {this.props.publishers.map((publisher, index) => {
              let classNameOfItem = '';
              if(this.props.activePublisher === index) classNameOfItem = 'activePublisher';
              return <li 
                        key={index} 
                        className={classNameOfItem}
                        onClick={this.changeItemPublusher.bind(this, index)}
                      >
                        <p>{publisher.name}</p>
                      </li>
            })}
          </ul>
        </nav>
        <RenderingNews 
          listOfNews = {this.props.listOfNews}
          requestFailed = {this.state.requestFailed}
          filterNews = {this.props.filterNews}
        />
        <footer>
          <p>Views today: {this.state.visitsToday.viewsOfPage}</p>
          <div className="developerInfo">
            <h4>Developed by: <span>Aleksey Androsuk</span></h4>
            <h4>Contact: <span>xoxach5@gmail.com</span></h4>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
    publishers: state.publisherstoState,
    activePublisher: state.changePublusher,
    listOfNews: filterContentNews(state.newsDataToState, state.filterNews),
    filterNews: state.filterNews,
    session: state.session,
})

const mapDispatchToProps = () => (
  dispatch => ({
    changePublusher: (activePublisher) => {
      dispatch({ type: 'CHANGE_PUBLISHER', payload: activePublisher})
    },
    newsDataToState: (listOfNews) => {
      dispatch({type: 'NEWS_DATA_TO_STATE', payload: listOfNews})
    },
    onFindNews : (newsLine) => {
      dispatch({ type: 'FIND_NEWS', payload: newsLine})
    },
  })
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
