import React, { Component } from 'react';

export default class Search extends Component {
  constructor(){
    super();
    this.state = {
      focused: false,
    }
    this.onFocusInput = this.onFocusInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
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
    this.props.setInputValue({ inputTargetValue: event.target.value });
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
    );
  }
}

