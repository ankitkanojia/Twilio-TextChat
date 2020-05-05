import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TwilioProgrammableChat from './TwilioProgrammableChat/Index';

const Main = () => (
        <Switch>
            <Route exact path='/' component={TwilioTextChat}/>
        </Switch>
)

export default Main;