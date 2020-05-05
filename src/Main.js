import React from 'react';
import { Switch, Route } from 'react-router-dom';
import TwilioProgrammableChat from './TwilioProgrammableChat/Index';

const Main = () => (
        <Switch>
            <Route exact path='/' component={TwilioProgrammableChat}/>
        </Switch>
)

export default Main;