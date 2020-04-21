import React, { Component } from 'react';
import LioWebRTC from 'liowebrtc';
import './ChatBox.css';

class GroupChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nick: this.props.nick,
      roomID: `party-${this.props.roomName}`,
      muted: false,
      camPaused: false,
      peers: []
    };
    this.remoteVideos = {};
  }

  componentDidMount() {
    this.webrtc = new LioWebRTC({
      // The url for your signaling server. Use your own in production!
      //url: 'https://sm1.lio.app:443/',
      // The local video ref set within your render function
      localVideoEl: this.localVid,
      // Immediately request camera access
      autoRequestMedia: true,
      // Optional: nickname
      nick: this.state.nick,
      debug: true
    });

    this.webrtc.on('peerStreamAdded', this.addVideo);
    this.webrtc.on('removedPeer', this.removeVideo);
    this.webrtc.on('ready', this.readyToJoin);
    this.webrtc.on('iceFailed', this.handleConnectionError);
    this.webrtc.on('connectivityError', this.handleConnectionError);
  }

  addVideo = (stream, peer) => {
    this.setState({ peers: [...this.state.peers, peer] }, () => {
      this.webrtc.attachStream(stream, this.remoteVideos[peer.id]);
    });
  }

  removeVideo = (peer) => {
    this.setState({
      peers: this.state.peers.filter(p => !p.closed)
    });
  }

  handleConnectionError = (peer) => {
    const pc = peer.pc;
    console.log('had local relay candidate', pc.hadLocalRelayCandidate);
    console.log('had remote relay candidate', pc.hadRemoteRelayCandidate);
  }

  readyToJoin = () => {
    // Starts the process of joining a room.
    this.webrtc.joinRoom(this.state.roomID, (err, desc) => {
    });
  }

  // Show fellow peers in the room
  generateRemotes = () => this.state.peers.map((p) => (
    <div key={p.id}>
      <div id={/* The video container needs a special id */ `${this.webrtc.getContainerId(p)}`}>
        <video
          // Important: The video element needs both an id and ref
          id={this.webrtc.getDomId(p)}
          ref={(v) => this.remoteVideos[p.id] = v}
          />
      </div>
        <p>{p.nick}</p>
    </div>
    ));

  disconnect = () => {
    this.webrtc.quit();
  }

  componentWillUnmount() {
    this.disconnect();
  }

  render() {
    return (
      <div>
        <div>
            <video
              // Important: The local video element needs to have a ref
              ref={(vid) => { this.localVid = vid; }}
            />
            <p>{this.state.nick}</p>
        </div>
        {this.generateRemotes()}
      </div>
    );
  }
}

export default GroupChat;