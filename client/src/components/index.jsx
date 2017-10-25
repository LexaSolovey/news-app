import React, { Component } from 'react';
import { Icon } from 'react-fa';

import '../styles/index.css';
import '../styles/media.css';

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
    fetchCountVisitsOfPage().then(visits => this.setState({ visitsToday: visits }));
    this.getNewsData(this.props.publishers[this.props.activePublisher].apiCode);
  }

  render() {
    const spinner = 
      <div className="spinner">
        <Icon size = "3x" spin name="spinner" />
      </div>;

    return (
      <div className="App">
        <Header setChosenItemOfPublishers={this.setChosenItemOfPublishers} />
        <Search setInputValue = {this.setInputValue}/>
        <Navigation 
          publishers={this.props.publishers}
          activePublisher={this.props.activePublisher}
          setChosenItemOfPublishers={this.setChosenItemOfPublishers}
        />
        {this.props.listOfNews.length === 0  && this.props.filterNews === '' && !this.state.requestFailed
          ? spinner 
          : null}
        <RenderingNews 
          listOfNews={this.props.listOfNews}
          requestFailed={this.state.requestFailed}
          filterNews={this.props.filterNews}
        />
        <Footer visitsToday={this.state.visitsToday} />
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
