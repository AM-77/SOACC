import React, { Component } from 'react'
import Axios from 'axios'

export default class LibCons extends Component {

    constructor(props) {
        super(props)
        this.state = {
            join: false,
            year: false,
            the_year: new Date().getFullYear()
        }
    }

    componentDidMount() {
        Axios.get("http://localhost:3303/oc-service/join/" + this.state.the_year, { headers: { authorization: "Bearer " + this.props.token } })
            .then(res => {
                this.setState(state => ({ join: res.data.result[0].join_is_open, year: res.data.result[0].year.year_is_open }))
            })
            .catch(err => console.log(err))
    }

    onCheck = e => {
        let checked = e.target.checked
        if (e.target.name === "join") {
            Axios.post("http://localhost:3303/oc-service/join/" + this.state.the_year, { open: checked }, { headers: { authorization: "Bearer " + this.props.token } })
                .then(res => {
                    if (res.data.success)
                        this.setState(state => ({ join: checked }))
                })
                .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div className="lib-cons-container">
                <h1>Lib Cons</h1>
                <div>
                    <h2 className="title">Year {this.state.the_year}</h2>
                    <div>
                        <h4 className="check-label">Joining The Library {this.state.the_year} Is {this.state.join ? "Open" : "Closed"}</h4>
                        <input className="check-input" type="checkbox" onChange={this.onCheck} checked={this.state.join} name="join" disabled={!this.state.year} />
                    </div>
                </div>
            </div>
        )
    }
}
