import React, { Component } from 'react'
import MessageForm from './MessageForm'
import MessageList from './MessageList'
import TwilioChat from 'twilio-chat'
import './index.css'

const userToken = {
  "identity": "Cameron Green",
  "jwt": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2YzOGI0YjRjMGZjN2U4YzQ0NjNhZDg5MmRmY2VmZGQ5LTE1ODg1MDIyNDUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJDYW1lcm9uIEdyZWVuIiwiY2hhdCI6eyJzZXJ2aWNlX3NpZCI6IklTZmNkZDBkYzMzMDhmNGYyOGJlZDljMDMwZmMxMThjMDQifX0sImlhdCI6MTU4ODUwMjI0NSwiZXhwIjoxNTg4NTA1ODQ1LCJpc3MiOiJTS2YzOGI0YjRjMGZjN2U4YzQ0NjNhZDg5MmRmY2VmZGQ5Iiwic3ViIjoiQUNlODA0YWFkMTkyODEwNTlmYzA3MzQwZjg1ZWIxODk0NiJ9.bzdlPY3niYyrtJlSsyK3hnaXgEtpLav29oWwY6Afc-E"
}

const tokenCollection = [
  {
    "uniqueName": "general1",
  },
  {
    "uniqueName": "general2",
  },
  {
    "uniqueName": "general3",
  }
]

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      username: null,
      channel: null
    }
  }

  componentDidMount(){
    const currentNo = this.props.greeting;
    this.setState({
      chatno: currentNo
    }, () => {
      this.initiateChat();
    });
  }

  initiateChat = () => {
    this.getToken()
      .then(this.createChatClient)
      .then(this.joinGeneralChannel)
      .then(this.configureChannelEvents)
      .catch((error) => {
        this.addMessage({ body: error.message })
      })
  }

  getToken = () => {
    return new Promise((resolve, reject) => {
      this.addMessage({ body: 'Connecting...' })
      this.setState({ username: userToken.identity });
      resolve(userToken)
      // $.getJSON('/token', (token) => {
      //   this.setState({ username: this.state.name });
      //   resolve(token)
      // }).fail(() => {
      //   reject(Error('Failed to connect.'))
      // })
    })
  }

  createChatClient = (token) => {
    return new Promise((resolve, reject) => {
      TwilioChat.create(token.jwt).then((client) => {
        resolve(client);
      }).catch((error) => reject(Error(error)))
    })
}

  joinGeneralChannel = (chatClient, s_uniquename) => {
    return new Promise((resolve, reject) => {
      chatClient.getSubscribedChannels().then(() => {
          chatClient.getChannelByUniqueName(tokenCollection[this.state.chatno].uniqueName).then((channel) => {
              this.addMessage({ body: 'Joining '+ tokenCollection[this.state.chatno].uniqueName + ' channel...' })
              this.setState({ channel })

              channel.join().then(() => {
                  this.addMessage({ body: `Joined general channel as ${this.state.username}` })
                  window.addEventListener('beforeunload', () => channel.leave())
              }).catch((error) => reject(Error(error)))
              //.catch(() => reject(Error('Could not join general channel.')))

              resolve(channel)
          }).catch((error) => {
            reject(Error(error));
            this.createGeneralChannel(chatClient);
          })
      }).catch((error) => reject(Error(error)))
      //.catch(() => reject(Error('Could not get channel list.')))
    })
  }

  createGeneralChannel = (chatClient) => {
    const s_uniquename = tokenCollection[this.state.chatno].uniqueName;
    const s_frientlyname = Math.random().toString(36).substring(7);
    return new Promise((resolve, reject) => {
      this.addMessage({ body: 'Creating general channel...' })
      chatClient
        .createChannel({ uniqueName: s_uniquename, friendlyName: s_uniquename })
        .then(() => this.joinGeneralChannel(chatClient, s_uniquename))
        .catch((error) => reject(Error(error)))
        //.catch(() => reject(Error('Could not create general channel.')))
    })
  }

  addMessage = (message) => {
    const messageData = { ...message, me: message.author === this.state.username }
    this.setState({
      messages: [...this.state.messages, messageData],
    })
  }

  handleNewMessage = (text) => {
    if (this.state.channel) {
      this.state.channel.sendMessage(text)
    }
  }

  configureChannelEvents = (channel) => {
    channel.on('messageAdded', ({ author, body }) => {
      this.addMessage({ author, body })
    })

    channel.on('memberJoined', (member) => {
      this.addMessage({ body: `${member.identity} has joined the channel.` })
    })

    channel.on('memberLeft', (member) => {
      this.addMessage({ body: `${member.identity} has left the channel.` })
    })
  }

  handleChange = (evt) => {      
    this.setState({ [evt.target.name]: JSON.parse(evt.target.value) });
  }

  render() {
    const roomDetail = tokenCollection[this.state.chatno];
    return (
      <div style={{marginTop:"60px"}}>
        <h2>Channel Room : {roomDetail && roomDetail.uniqueName}</h2>
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    )
  }
}

export default Index;
