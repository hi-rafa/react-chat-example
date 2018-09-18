import React from 'react'
import Chatkit from '@pusher/chatkit'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import RoomList from './components/RoomList'
import NewRoomForm from './components/NewRoomForm'

import './App.css';

import { tokenUrl, instanceLocator } from './config'

class App extends React.Component {

    constructor() {
        super()
        this.state = {
            messages: []
        }
    }

     componentDidMount() {

        const chatManager = new Chatkit.ChatManager({
            instanceLocator,
            userId: 'rafa',
            tokenProvider: new Chatkit.TokenProvider({
                url: tokenUrl
            })
        })

        chatManager.connect()
        .then(currentUser => {
            this.currentUser = currentUser
            this.currentUser.subscribeToRoom({
                roomId: 16251676,
                hooks: {
                    onNewMessage: message => {
                        console.log('message.text: ', message.text);
                        this.setState({
                            messages: [...this.state.messages, message]
                        })
                    }
                }
            })
        })

     }

     sendMessage(text) {
         console.log('rafa');
         console.log(text);
        this.currentUser.sendMessage({
            text, //same as text: text
            roomId: 16251676
        })
    }

    render () {
        console.log('this.state.messages', this.state.messages);
        return (
            <div className="app">
                <RoomList />
                <MessageList messages={this.state.messages} />
                <SendMessageForm sendMessage={(text) => this.sendMessage(text)} />
                <NewRoomForm />
            </div>
        );
    }
}

export default App