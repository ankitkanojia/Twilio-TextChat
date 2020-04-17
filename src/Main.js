import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TextChat from './TextChat';

const Main = () => (
        <Switch>
            <Route exact path='/textchat' component={TextChat}/>
        </Switch>
)

export default Main;