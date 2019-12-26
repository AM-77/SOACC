import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import { connect } from 'react-redux'
import { login, logout, error_handler, clear_error } from '../redux-store/actions/authActionCreator'

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
        if (this.state.email !== "" && this.state.password !== "") {
            Axios.post("http://localhost:3301/auth-service/login", { email: this.state.email, password: this.state.password })
                .then(res => {
                    this.props.login(res.data.token, res.data.user)
                    localStorage.app_token = res.data.token
                    this.setState({ logged: true })
                })
                .catch(err => {
                    const error = {
                        status: err.response.status,
                        status_text: err.response.statusText,
                        message: err.response.data.message
                    }
                    this.fire_error(error)
                })
        } else {
            const error = {
                status: "",
                status_text: "Empty Fields",
                message: "Please make sure to fill all the required fields"
            }
            this.fire_error(error)
        }
    }

    fire_error = error => {
        this.props.error_handler(error)
        setTimeout(() => {
            this.props.clear_error()
        }, 300000)
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
                    <div className="head">
                        <h2 className="title">Login</h2>
                        {
                            this.props.error
                                ?
                                <div className="error-container">
                                    <p className="the-error"><b className="error-status">{this.props.error.status_text}: </b><span className="error-message">{this.props.error.message}</span></p>
                                </div>
                                :
                                null
                        }
                    </div>
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
const dispatchStateToProps = (dispatch) => ({
    login: (token, user) => dispatch(login(token, user)),
    logout: () => dispatch(logout()),
    error_handler: (error) => dispatch(error_handler(error)),
    clear_error: () => dispatch(clear_error())
})

export default connect(mapStateToProps, dispatchStateToProps)(Login)