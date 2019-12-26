import React, { Component } from 'react'
import { connect } from 'react-redux'
import { error_handler } from '../redux-store/actions/authActionCreator'
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
        this.get_data()
    }

    onCheck = e => {
        let checked = e.target.checked
        if (e.target.name === "year") {
            this.setState(state => ({ year: checked }))
            Axios.post("http://localhost:3303/oc-service/year/" + this.state.the_year, { open: checked }, { headers: { authorization: "Bearer " + this.props.token } })
                .then(result => {
                    this.get_data()
                })
                .catch(err => this.props.error_handler(err))
        }
        if (e.target.name === "insc") {
            this.setState(state => ({ insc: checked }))
            Axios.post("http://localhost:3303/oc-service/insc/" + this.state.the_year, { open: checked }, { headers: { authorization: "Bearer " + this.props.token } })
                .then(result => {
                    this.get_data()
                })
                .catch(err => this.props.error_handler(err))
        }

    }

    get_data = () => {
        Axios.get("http://localhost:3303/oc-service/insc/" + this.state.the_year, { headers: { authorization: "Bearer " + this.props.token } })
            .then(res => {
                this.setState(state => ({ year: res.data.result.year.year_is_open, insc: res.data.result.insc_is_open }))
            })
            .catch(err => this.props.error_handler(err))
    }

    render() {
        return (
            <div className="dep-chef-container">
                <h1>Dep Chef</h1>
                <div>
                    <h2 className="title">Year {this.state.the_year}</h2>
                    <div>
                        <h4 className="check-label">The Year {this.state.the_year} Is {this.state.year ? "Open" : "Closed"}</h4>
                        <input className="check-input" type="checkbox" onChange={this.onCheck} checked={this.state.year} name="year" />
                    </div>
                </div>

                <div>
                    <h2 className="title">Inscritions</h2>
                    <div>
                        <h4 className="check-label">The Inscritions Of {this.state.the_year} Is {this.state.insc ? "Open" : "Closed"}</h4>
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
        error_handler: (error) => dispatch(error_handler(error))
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(DepChef)