import React, { Component } from 'react'

export default class ScolAgentSubscribeStudent extends Component {
    render() {
        return (
            <div className="subscribe-student-container">
                <h2 className="title">Subscribe A Student</h2>
                <div className="subscribe-student-form">
                    <form>
                        <input type="text" onChange={this.props.onInput} name="mat" placeholder="Enter a student's matricule" />
                        <input type="email" onChange={this.props.onInput} name="email" placeholder="Enter a student's email" />
                        <input type="text" onChange={this.props.onInput} name="first_name" placeholder="Enter a student's first name" />
                        <input type="text" onChange={this.props.onInput} name="last_name" placeholder="Enter a student's last name" />
                        <input type="date" min="1960-01-01" max={new Date().getFullYear() - 16 + "-01-01"} onChange={this.props.onInput} name="birthdate" placeholder="Enter a student's birthdate" />
                        <select name="year" onChange={this.props.onInput} placeholder="Enter student's year" >
                            <option value="L1">L1</option>
                            <option value="L2">L2</option>
                            <option value="L3">L3</option>
                            <option value="M1">M1</option>
                            <option value="M2">M2</option>
                            <option value="D1">D1</option>
                            <option value="D2">D2</option>
                            <option value="D3">D3</option>
                        </select>
                        <select name="dep" onChange={this.props.onInput} placeholder="Enter a student's departements" >
                            <option value="STIW">STIW</option>
                            <option value="GL">GL</option>
                            <option value="STIC">STIC</option>
                            <option value="RSD">RSD</option>
                        </select>
                        <input type="phone" onChange={this.props.onInput} name="phone" placeholder="Enter a student's phone number" />
                        <input type="text" onChange={this.props.onInput} name="facebook" placeholder="Enter a student's facebook" />
                        <input type="text" onChange={this.props.onInput} name="twitter" placeholder="Enter a student's twitter" />
                        <input type="email" onChange={this.props.onInput} name="second_email" placeholder="Enter a student's secondery email" />
                        <div className="clear"></div>
                        <button onClick={this.props.subscribeStudent}>Subscribe Student</button>
                    </form>
                </div>
            </div>
        )
    }
}
