import React, { Component } from 'react';
import getDate from '../../utils/getDate';

class HeadOfThePage extends Component {
  constructor(props){
    super(props);
    this.state = {
        focused: false,
    }
    this.onFocusInput = this.onFocusInput.bind(this);
    this.onBlurInput = this.onBlurInput.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  handleInputChange(event) {
    this.props.onFindNews(event.target.value);
    this.props.setValue({movieName: event.target.value});
  }

  render() {
    let classNames = {
        sectionSearch: 'sectionSearch',
        inputSubmit: 'inputSubmit',
      }
      if(this.state.focused){
        classNames.sectionSearch += ' sectionOnFocus';
        classNames.inputSubmit += " inputOnFocus";
      }
    return (
      <div className="HeadOfThePageWrapper">
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
              type="submit" value="" />
          </form>
        </section>
        <nav>
          <ul>
            {this.props.publishers.map((publisher, index) => {
              let classNameOfItem = '';
              if(this.props.activePublisher === index)
                classNameOfItem = 'activePublisher';
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
      </div>
    );
  }
}

export default HeadOfThePage;
