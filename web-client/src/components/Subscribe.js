import React, { Component } from 'react'
import Axios from 'axios'
import univ_logo from '../assets/univ-logo.png'

export default class Subscribe extends Component {

    constructor(props) {
        super(props)
        this.state = { email: "", password: "", type: "dep-chef" }
    }

    onInput = e => {
        let value = e.target.value
        if (e.target.name === "email") this.setState(state => ({ email: value }))
        if (e.target.name === "password") this.setState(state => ({ password: value }))
        if (e.target.name === "type") this.setState(state => ({ type: value }))
    }

    subscribe = e => {
        e.preventDefault()
        if (this.state.email !== "" && this.state.password !== "")
            Axios.post("http://localhost:3301/auth-service/subscribe", { email: this.state.email, password: this.state.password, type: this.state.type, mat: this.state.mat })
                .then(result => result.data.success ? this.props.history.push("/") : console.log("somthing unnormal happend."))
                .catch(error => console.log(error))
    }

    render() {
        return (
            <div className="subscribe-container">
                <div className="univ-logo">
                    <img src={univ_logo} alt="The University's Logo" />
                </div>
                <h2 className="title">Subscribe</h2>
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
