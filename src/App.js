import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';
import "./index.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <a target="_blank" href="https://github.com/ankitkanojia/realtimechat"><img className="githubribbon attachment-full size-full" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_green_007200.png?resize=149%2C149" alt="Fork me on GitHub" data-recalc-dims="1" /></a>
        <Header />
        <Main />
      </React.Fragment>
    );
  }
}

export default App;