import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TextChat from './TextChat';
import GroupChat from './GroupChat';
import SignalR from './SignalR';

const Main = () => (
        <Switch>
            <Route exact path='/textchat' component={TextChat}/>
            <Route exact path='/groupchat' component={GroupChat}/>
            <Route exact path='/' component={SignalR}/>
        </Switch>
)

export default Main;