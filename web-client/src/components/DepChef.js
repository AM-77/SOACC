import React, { Component } from 'react'
import { connect } from 'react-redux'
import { error_handler, clear_error } from '../redux-store/actions/authActionCreator'
import Axios from 'axios'

class DepChef extends Component {

    constructor(props) {
        super(props)
        this.state = {
            year: false,
            insc: false,
            the_year: new Date().getFullYear()
        }
    }

    componentDidMount() {
        this.get_data(true)
    }

    onCheck = e => {
        let checked = e.target.checked
        if (e.target.name === "year") {
            this.setState(state => ({ year: checked }))
            Axios.post("http://localhost:3303/oc-service/year/" + this.state.the_year, { open: checked }, { headers: { authorization: "Bearer " + this.props.token } })
                .then(result => {
                    this.get_data()
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
        if (e.target.name === "insc") {
            this.setState(state => ({ insc: checked }))
            Axios.post("http://localhost:3303/oc-service/insc/" + this.state.the_year, { open: checked }, { headers: { authorization: "Bearer " + this.props.token } })
                .then(result => {
                    this.get_data()
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

    get_data = (mounting = false) => {
        Axios.get("http://localhost:3303/oc-service/insc/" + this.state.the_year, { headers: { authorization: "Bearer " + this.props.token } })
            .then(res => {

                if (mounting) {
                    this.setState(state => ({ year: res.data.result.year.year_is_open, insc: res.data.result.insc_is_open }))
                } else {
                    const success = {
                        status: "",
                        message: ""
                    }
                    success.status = "Year / Inscriptions"
                    if (res.data.result.year.year_is_open) {
                        if (res.data.result.insc_is_open) {
                            success.message = "The Year & The Inscriptions Were Opend Successfully"
                        } else {
                            success.message = "The Year Was Opend & The Inscriptions Was Closed, Successfully"
                        }
                    } else {
                        success.message = "The Year & The Inscriptions Were Closed Successfully"
                    }

                    this.setState(state => ({ success, year: res.data.result.year.year_is_open, insc: res.data.result.insc_is_open }))
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
            <div className="dep-chef-container">
                <div className="head">
                    <h1>Dep Chef</h1>
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
                        <h4 className="check-label">The Year {this.state.the_year} Is {this.state.year ? "Open" : "Closed"}</h4>
                        <input className="check-input" type="checkbox" onChange={this.onCheck} checked={this.state.year} name="year" />
                    </div>
                </div>

                <div>
                    <h2 className="title">Inscriptions</h2>
                    <div>
                        <h4 className="check-label">The Inscriptions Of {this.state.the_year} Is {this.state.insc ? "Open" : "Closed"}</h4>
                        <input className="check-input" type="checkbox" disabled={!this.state.year} onChange={this.onCheck} checked={this.state.insc} name="insc" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({ ...store })
const dispatchStateToProps = (dispatch) => {
    return {
        error_handler: (error) => dispatch(error_handler(error)),
        clear_error: () => dispatch(clear_error())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(DepChef)