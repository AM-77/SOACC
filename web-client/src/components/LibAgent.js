import React, { Component } from 'react'
import { connect } from 'react-redux'
import { error_handler, clear_error } from '../redux-store/actions/authActionCreator'
import Axios from 'axios'

class LibAgent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            found_student: null,
            join_is_open: false,
            student_joind: null
        }
    }

    componentDidMount() {
        Axios.get("http://localhost:3303/oc-service/join/" + new Date().getFullYear(), { headers: { authorization: "Bearer " + this.props.token } })
            .then(res => {
                this.setState(state => ({ join_is_open: res.data.result[0].join_is_open }))
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

    findStudent = e => {
        let mat = e.target.value
        if (mat !== "")
            Axios.get("http://localhost:3301/auth-service/student/" + mat, { headers: { authorization: "Bearer " + this.props.token } })
                .then(res => {
                    if (res.data.student)
                        this.setState(state => ({ found_student: res.data.student, student_joind: res.data.student.joinedlib }))
                    else
                        this.setState(state => ({ found_student: null, student_joind: null }))
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
        Axios.post("http://localhost:3302/joinlib-service/joinlib/" + this.state.found_student.mat, { joinlib: !this.state.student_joind }, { headers: { authorization: "Bearer " + this.props.token } })
            .then(res => {
                !this.state.student_joind
                    ?
                    this.setState(state => ({ student_joind: !this.state.student_joind, success: { status: "Subscribe", message: "The Student Subscribed In The Library Successfuly." } }))
                    :
                    this.setState(state => ({ student_joind: !this.state.student_joind, success: { status: "Unsubscribe", message: "The Student Unsubscribed From The Library Successfuly." } }))


                this.clear_success()
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
            <div>
                <div className="scol-agent-container">
                    <div className="head">
                        <h1>Lib Agent</h1>
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

                    {
                        this.state.join_is_open
                            ?
                            <div>
                                <h2 className="title">Search A Student</h2>
                                <div>
                                    <h4 className="check-label">Search By Matricule: </h4>
                                    <div className="update-field">
                                        <label htmlFor="search-mat" className="update-label">matricule: </label>
                                        <input id="search-mat" className="search-input" type="text" onChange={this.findStudent} name="mat" placeholder="Enter a student's matricule" />
                                    </div>

                                    <div>
                                        {
                                            this.state.found_student
                                                ?
                                                <div>
                                                    <h4>The Student's Infos</h4>
                                                    <div className="student-info">
                                                        <p><span className="info-title">email:</span><span className="info-value">{this.state.found_student.email}</span></p>
                                                        <p><span className="info-title">first name:</span><span className="info-value">{this.state.found_student.first_name}</span></p>
                                                        <p><span className="info-title">last name:</span><span className="info-value">{this.state.found_student.last_name}</span></p>
                                                        <p><span className="info-title">birthdate:</span><span className="info-value">{this.state.found_student.birthdate}</span></p>
                                                        <p><span className="info-title">year:</span><span className="info-value">{this.state.found_student.year}</span></p>
                                                        <p><span className="info-title">departement:</span><span className="info-value">{this.state.found_student.dep}</span></p>
                                                        <p><span className="info-title">phone number:</span><span className="info-value">{this.state.found_student.links.phone}</span></p>
                                                        <p><span className="info-title">facebook:</span><span className="info-value">{this.state.found_student.links.facebook}</span></p>
                                                        <p><span className="info-title">twitter:</span><span className="info-value">{this.state.found_student.links.twitter}</span></p>
                                                        <p><span className="info-title">secondery email:</span><span className="info-value">{this.state.found_student.links.second_email}</span></p>
                                                    </div>
                                                    <div className="clear">
                                                        <h4 className="check-label">Join The Library</h4>
                                                        <input className="check-input" type="checkbox" onChange={this.onCheck} name="join" checked={this.state.student_joind} />
                                                    </div>
                                                </div>
                                                : <h4>No Student Was Found</h4>
                                        }
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                            :
                            <div className="error-container">
                                <p className="the-error"><b className="error-status">Sorry !!! </b><span className="error-message">Joining The Library Is Closed For The Moment.</span></p>
                            </div>
                    }

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

export default connect(mapStateToProps, dispatchStateToProps)(LibAgent)