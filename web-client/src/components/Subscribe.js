import React, { Component } from 'react'
import Axios from 'axios'
import univ_logo from '../assets/univ-logo.png'
import { connect } from 'react-redux'
import { error_handler, clear_error } from '../redux-store/actions/authActionCreator'

class Subscribe extends Component {

    constructor(props) {
        super(props)
        this.state = { email: "", password: "", type: "dep-chef", success: null }
    }

    onInput = e => {
        let value = e.target.value
        if (e.target.name === "email") this.setState(state => ({ email: value }))
        if (e.target.name === "password") this.setState(state => ({ password: value }))
        if (e.target.name === "type") this.setState(state => ({ type: value }))
    }

    subscribe = e => {
        e.preventDefault()
        if (this.state.email !== "" && this.state.password !== "") {
            Axios.post("http://localhost:3301/auth-service/subscribe", { email: this.state.email, password: this.state.password, type: this.state.type, mat: this.state.mat })
                .then(result => {
                    if (result.data.success) {
                        this.setState(state => ({ success: { status: "Subscription", message: "The User Has Been Subscribed Successfuly." } }))
                        this.clear_success()
                    } else {
                        this.fire_error({ status_text: "Subscription", message: "Somthing Wrong Happened. Please Try Again Later." })
                    }
                })
                .catch(err => {
                    const error = {
                        status: err.response.status,
                        status_text: err.response.statusText,
                        message: err.response.data.message
                    }
                    this.fire_error(error)
                })
        }
        else {
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
        console.clear()
        setTimeout(() => {
            this.props.clear_error()
        }, 3000)
    }

    clear_success = () => {
        setTimeout(() => {
            this.setState(state => ({ success: null }))
        }, 3000)
    }

    render() {
        return (
            <div className="subscribe-container">
                <div className="univ-logo">
                    <img src={univ_logo} alt="The University's Logo" />
                </div>
                <div className="head">
                    <h2 className="title">Subscribe</h2>
                    {
                        this.props.error
                            ?
                            <div className="error-container">
                                <p className="the-error"><b className="error-status">{this.props.error.status_text}: </b><span className="error-message">{this.props.error.message}</span></p>
                            </div>
                            :
                            null
                    }
                    {
                        this.state.success
                            ?
                            <div className="success-container">
                                <p className="the-success"><b className="success-status">{this.state.success.status}: </b><span className="success-message">{this.state.success.message}</span></p>
                            </div>
                            :
                            null
                    }
                </div>
                <form>
                    <input name="email" type="email" onChange={this.onInput} placeholder="Your email" />
                    <input name="password" type="password" onChange={this.onInput} placeholder="Your password" />
                    <select name="type" onChange={this.onInput} placeholder="Your type" >
                        <option value="dep-chef" >dep-chef</option>
                        <option value="scol-agent" >scol-agent</option>
                        <option value="lib-cons" >lib-cons</option>
                        <option value="lib-agent" >lib-agent</option>
                    </select>
                    <button onClick={this.subscribe}>Subscribe</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({ ...store })
const dispatchStateToProps = (dispatch) => ({
    error_handler: (error) => dispatch(error_handler(error)),
    clear_error: () => dispatch(clear_error())
})

export default connect(mapStateToProps, dispatchStateToProps)(Subscribe)