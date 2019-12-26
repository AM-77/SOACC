import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import ReduxStore from "./redux-store"

import Home from './components/Home'
import Login from './components/Login'
import Subscribe from './components/Subscribe'
import NavBar from './components/NavBar'

export default class App extends Component {

    render() {
        return (
            <ReduxStore>
                <div className="container">
                    <Router>
                        <NavBar />
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route path="/login" component={Login} />
                            <Route path="/subscribe" component={Subscribe} />
                            <Redirect to="/" />
                        </Switch>
                    </Router>
                </div>
            </ReduxStore>
        )
    }
}