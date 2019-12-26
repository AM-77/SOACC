import React, { Component } from 'react'
import { connect } from 'react-redux'
import { error_handler } from '../redux-store/actions/authActionCreator'
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
            .catch(err => this.props.error_handler(err))
    }

    findStudent = e => {
        let mat = e.target.value
        if (mat !== "")
            Axios.get("http://localhost:3301/auth-service/student/" + mat, { headers: { authorization: "Bearer " + this.props.token } })
                .then(res => {
                    this.setState(state => ({ found_student: res.data.student, student_joind: res.data.student.joinedlib }))
                    // Notify the User
                })
                .catch(err => this.props.error_handler(err))
    }

    onCheck = e => {
        Axios.post("http://localhost:3302/joinlib-service/joinlib/" + this.state.found_student.mat, { joinlib: !this.state.student_joind }, { headers: { authorization: "Bearer " + this.props.token } })
            .then(res => {
                this.setState(state => ({ student_joind: !this.state.student_joind }))
            })
            .catch(err => this.props.error_handler(err))
    }

    render() {
        return (
            <div>
                <div className="scol-agent-container">
                    <h1>Lib Agent</h1>

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
                            <h4 className="sorry" >Sorry!!! Joining The Library Is Closed For The Moment.</h4>
                    }

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

export default connect(mapStateToProps, dispatchStateToProps)(LibAgent)