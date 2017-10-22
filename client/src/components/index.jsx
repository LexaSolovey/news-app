import React, { Component } from 'react';

import '../styles/index.css';

import Header from './Header';
import Search from './Search';
import Navigation from './Navigation';
import RenderingNews from './RenderingNews';
import Footer from './Footer';

import { connect } from 'react-redux';

import { fetchNewsData, fetchCountVisitsOfPage } from '../utils/Api';
import filterContentNews from '../utils/filterContentNews';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false,
      visitsToday: [],
    }
    this.setInputValue = this.setInputValue.bind(this);
    this.setChosenItemOfPublishers = this.setChosenItemOfPublishers.bind(this);
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

  setInputValue(inputValue) {
    this.props.onFindNews(inputValue.inputTargetValue);
  }

  setChosenItemOfPublishers(activePublisherIndex) {
    this.props.changePublusher(activePublisherIndex.publisher);
    this.getNewsData(this.props.publishers[activePublisherIndex.publisher].apiCode);
  }

  componentDidMount() {
    this.getNewsData(this.props.publishers[this.props.activePublisher].apiCode);
    fetchCountVisitsOfPage().then(visits => this.setState({ visitsToday: visits }));
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Search setInputValue = {this.setInputValue}/>
        <Navigation 
          publishers = {this.props.publishers}
          activePublisher = {this.props.activePublisher}
          setChosenItemOfPublishers = {this.setChosenItemOfPublishers}
        />
        <RenderingNews 
          listOfNews = {this.props.listOfNews}
          requestFailed = {this.state.requestFailed}
          filterNews = {this.props.filterNews}
        />
        <Footer visitsToday = {this.state.visitsToday} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  publishers: state.publisherstoState,
  activePublisher: state.changePublusher,
  listOfNews: filterContentNews(state.newsDataToState, state.filterNews),
  filterNews: state.filterNews,
})

const mapDispatchToProps = () => (
  dispatch => ({
    changePublusher: activePublisher => dispatch({ type: 'CHANGE_PUBLISHER', payload: activePublisher}),
    newsDataToState: listOfNews => dispatch({type: 'NEWS_DATA_TO_STATE', payload: listOfNews}),
    onFindNews: newsLine => dispatch({ type: 'FIND_NEWS', payload: newsLine}),
  })
)

export default connect(mapStateToProps, mapDispatchToProps)(App);
