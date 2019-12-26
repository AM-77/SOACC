import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

import { connect } from 'react-redux'
import { login, logout } from '../redux-store/actions/authActionCreator'
import univ_logo from '../assets/univ-logo.png'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            logged: false
        }
    }

    onInput = e => {
        let value = e.target.value
        if (e.target.name === "email") this.setState(state => ({ email: value }))
        if (e.target.name === "password") this.setState(state => ({ password: value }))
    }

    login = e => {
        e.preventDefault()
        Axios.post("http://localhost:3301/auth-service/login", { email: this.state.email, password: this.state.password })
            .then(res => {
                this.props.login(res.data.token, res.data.user)
                localStorage.app_token = res.data.token
                this.setState({ logged: true })
            })
            .catch(err => console.log("There was an error in login: ", err))
    }

    render() {
        return (
            this.state.logged
                ?
                <Redirect to="/" />
                :
                <div className="login-container">
                    <div className="univ-logo">
                        <img src={univ_logo} alt="The University's Logo" />
                    </div>
                    <h2 className="title">Login</h2>
                    <form>
                        <input type="email" onChange={this.onInput} name="email" placeholder="Your email" />
                        <input type="password" onChange={this.onInput} name="password" placeholder="Your password" />
                        <button type="submit" onClick={this.login}>login</button>
                    </form>
                </div>
        )
    }
}

const mapStateToProps = (store) => ({ ...store })
const mapDispatchToProps = (dispatch) => {
    return {
        login: (token, user) => dispatch(login(token, user)),
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
