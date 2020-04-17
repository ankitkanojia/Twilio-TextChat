import React, { Component } from 'react';
import './ChatBox.css';
import { withWebRTC } from 'react-liowebrtc';

class ChatBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputMsg: ''
    };
  }
    
  generateChats = () => {
    if(this.chatBox) {
      setTimeout(() => { this.chatBox.scrollTop = this.chatBox.scrollHeight; }, 2);
    }
    return this.props.chatLog.map((item) => (
      item.message && item.message.length > 0 && item.name === "Me" ? <li className="message left appeared" key={`chat-${item.name}-${item.timestamp}`} >
        <div className="text_wrapper">
          <div className="text">{item.message}</div>
        </div>
      </li> :
        item.message && item.message.length > 0 &&
        <li className="message right appeared"  key={`chat-${item.name}-${item.timestamp}`}>
          <div className="text_wrapper">
            <div className="text">{item.message}</div>
          </div>
        </li>
      // <div className="chat" key={`chat-${item.name}-${item.timestamp}`}>
      //   <b className="name" style={{ color: item.alert ? '#888' : '#333' }}>{item.name}</b> <span className="msg">{item.message}</span>
      // </div>
    ));
  }

  handleSend = (chatMsg) => {
    this.props.webrtc.shout('chat', chatMsg);
    this.props.onSend(chatMsg);
  }

  handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      this.handleSend(this.state.inputMsg);
      this.setState({ inputMsg: '' });
    }
  }

  handleOnSendClick = () => {
    this.handleSend(this.state.inputMsg);
    this.setState({ inputMsg: '' });
  }

  handleInputChange = (evt) => this.setState({ inputMsg: evt.target.value });

  render() {
    const { chatLog } = this.props;
    return (
      <React.Fragment>
        <div className="chat_window">
          <div className="top_menu">
            <div className="title">{this.props.username}</div>
            {/* One To One Text Chat(<small><a href="https://www.npmjs.com/package/react-liowebrtc">Package Link</a></small>) */}
          </div>
          <ul className="messages" ref={(div) => this.chatBox = div}>
          {chatLog.length ? this.generateChats() : (
            <div className="info">
              <p>To test this component out, open this page in a new tab or send it to a friend.</p>
            </div>
          )}
            {/* <li className="message left appeared">
              <div className="avatar"></div>
              <div className="text_wrapper">
                <div className="text">Hello Philip! :)</div>
              </div>
            </li>
            <li className="message right appeared">
              <div className="avatar"></div>
              <div className="text_wrapper">
                <div className="text">Hi Sandy! How are you?</div>
              </div>
            </li> */}
          </ul>
          <div className="bottom_wrapper clearfix">
            <div className="message_input_wrapper">
              <input className="message_input" placeholder="Type your message here..." placeholder="Type a message..." onKeyUp={this.handleKeyUp} onChange={this.handleInputChange} value={this.state.inputMsg} />
            </div>
            <div className="send_message" onClick={this.handleOnSendClick}>
              <div className="icon"></div>
              <div className="text">Send</div>
            </div>
          </div>
        </div>
        {/* <div className="message_template">
          <li className="message">
            <div className="avatar"></div>
            <div className="text_wrapper">
              <div className="text"></div>
            </div>
          </li>
        </div> */}
      </React.Fragment>
      // <div className="container">
      //   <div className="chatHeader">
      //     <h1 className="title">P2P Chat Example</h1>
      //     <hr />
      //   </div>
      //   <div className="chatBox" ref={(div) => this.chatBox = div}>
      //     {chatLog.length ? this.generateChats() : (
      //       <div className="info">
      //         <p>To test this component out, open this page in a new tab or send it to a friend.</p>
      //       </div>
      //     )}
      //   </div>
      //   <hr />
      //   <div className="bottomBar">
      //     <input className="chatInput" type="text" placeholder="Type a message..." onKeyUp={this.handleKeyUp} onChange={this.handleInputChange} value={this.state.inputMsg} />
      //   </div>
      // </div>
    );
  }
}
export default withWebRTC(ChatBox);