import React, { Component } from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { error_handler, clear_error } from '../redux-store/actions/authActionCreator'

class LibCons extends Component {

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
            .catch(err => {
                const error = {
                    status: err.response.status,
                    status_text: err.response.statusText,
                    message: err.response.data.message
                }
                this.fire_error(error)
            })
    }

    onCheck = e => {
        let checked = e.target.checked
        if (e.target.name === "join") {
            Axios.post("http://localhost:3303/oc-service/join/" + this.state.the_year, { open: checked }, { headers: { authorization: "Bearer " + this.props.token } })
                .then(res => {
                    if (res.data.success) {
                        checked
                            ?
                            this.setState(state => ({ join: checked, success: { status: "Open", message: "The Library Has Been Opened Successfuly." } }))
                            :
                            this.setState(state => ({ join: checked, success: { status: "Close", message: "The Library Has Been Closed Successfuly." } }))

                        this.clear_success()
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
            <div className="lib-cons-container">
                <div className="head">
                    <h1>Lib Cons</h1>
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

const mapStateToProps = (store) => ({ ...store })
const dispatchStateToProps = (dispatch) => ({
    error_handler: (error) => dispatch(error_handler(error)),
    clear_error: () => dispatch(clear_error())
})

export default connect(mapStateToProps, dispatchStateToProps)(LibCons)