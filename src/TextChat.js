import React, { Component } from 'react';
import { LioWebRTC } from 'react-liowebrtc';
//import './CustomChat.css';
import './ChatBox.css';
import ChatBox from './ChatBox';

class TextChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chatLog: [],
      options: {
        nick: "User-" + Math.random().toString(36).substr(2, 6),
        debug: true,
        dataOnly: true,
        network: {
          maxPeers: 2,
          minPeers: 1
        }
      }
    };
  }
  
  join = (webrtc) => 
  { 
    webrtc.joinRoom('bf50848421d14f75bd37');
  }

  handleCreatedPeer = (webrtc, peer) => {
    this.addChat(`Peer joined the room!`, 'Peer joined the room', true);
  }
  
  handlePeerData = (webrtc, type, payload, peer) => {
    switch(type) {
      case 'chat':
        this.addChat(`Peer-${peer.nick.substring(0, 5)}`, payload);
        break;
      default:
        return;
    };
  }

  addChat = (name, message, alert = false) => {
    this.setState({ chatLog: this.state.chatLog.concat({
      name,
      message: `${message}`,
      timestamp: `${Date.now()}`,
      alert
    })});
  }
  

  render() {
    const { chatLog, options } = this.state;
    return (
      <React.Fragment>
        <LioWebRTC
            options={options}
            onReady={this.join}
            onCreatedPeer={this.handleCreatedPeer}
            onReceivedPeerData={this.handlePeerData}
          >
          <ChatBox
            username={this.state.options.nick}
            chatLog={chatLog}
            onSend={(msg) => msg && this.addChat('Me', msg)}
          />
        </LioWebRTC>
      </React.Fragment>
    );
  }
}

export default TextChat;