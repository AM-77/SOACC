import React, { Component } from 'react'
import { connect } from 'react-redux'
import { error_handler, clear_error } from '../redux-store/actions/authActionCreator'
import Axios from 'axios'
import ScolAgentFindStudent from './ScolAgentFindStudent'
import ScolAgentSubscribeStudent from './ScolAgentSubscribeStudent'
import ScolAgentStudentsList from './ScolAgentStudentsList'

class ScolAgent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            found_student: null,
            mat: null,
            email: null,
            first_name: null,
            last_name: null,
            birthdate: null,
            year: "L1",
            dep: "STIW",
            phone: null,
            facebook: null,
            twitter: null,
            second_email: null,
            success: null,
            userUpdated: false,
            active_tab: "update-student",
            students: []
        }
    }

    findStudent = e => {
        let mat = e.target.value
        if (mat !== "")
            Axios.get("http://localhost:3301/auth-service/student/" + mat, { headers: { authorization: "Bearer " + this.props.token } })
                .then(res => {
                    this.setState(state => ({ found_student: res.data.student, userUpdated: false }))
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

    onInput = e => {
        let name = e.target.name
        let value = e.target.value
        this.setState(state => ({ [name]: value }))
    }

    onUpdateInput = e => {
        let name = e.target.name
        let value = e.target.value
        let student = this.state.found_student
        student[name] = value
        this.setState(state => ({ found_student: student, userUpdated: true }))
    }

    subscribeStudent = e => {
        e.preventDefault()
        if (this.state.mat
            && this.state.email
            && this.state.first_name
            && this.state.last_name
            && this.state.birthdate
            && this.state.year
            && this.state.dep) {
            let student = {
                mat: this.state.mat,
                email: this.state.email,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                birthdate: this.state.birthdate,
                year: this.state.year,
                dep: this.state.dep,
                links: {
                    phone: this.state.phone,
                    facebook: this.state.facebook,
                    twitter: this.state.twitter,
                    second_email: this.state.second_email
                }
            }
            Axios.post("http://localhost:3301/auth-service/student/", student, { headers: { authorization: "Bearer " + this.props.token } })
                .then(res => {
                    if (res.data.success) {
                        this.setState(state => ({ success: { status: "Subscribe", message: "The Student Has Been Subscribed Successfuly." } }))
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
        } else {
            const error = {
                status: "",
                status_text: "Empty Fields",
                message: "Please make sure to fill all the required fields"
            }
            this.fire_error(error)
        }
    }

    updateStudent = e => {
        e.preventDefault()

        if (this.state.found_student.mat !== ""
            && this.state.found_student.email !== ""
            && this.state.found_student.first_name !== ""
            && this.state.found_student.last_name !== ""
            && this.state.found_student.birthdate !== ""
            && this.state.found_student.year !== ""
            && this.state.found_student.dep !== "") {
            if (this.state.userUpdated)
                Axios.patch("http://localhost:3301/auth-service/student/" + this.state.found_student.mat, this.state.found_student, { headers: { authorization: "Bearer " + this.props.token } })
                    .then(res => {
                        if (res.data.success) {
                            this.setState(state => ({ success: { status: "Update", message: "The Student Has Been Updated Successfuly." } }))
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
        } else {
            const error = {
                status: "",
                status_text: "Empty Fields",
                message: "Please make sure to fill all the required fields"
            }
            this.fire_error(error)
        }
    }

    deleteStudent = e => {
        e.preventDefault()
        let confirm = window.confirm("Do you really want to delete this student ? \nThis operation can't be undone.")
        if (confirm)
            Axios.delete("http://localhost:3301/auth-service/student/" + this.state.found_student.mat, { headers: { authorization: "Bearer " + this.props.token } })
                .then(res => {
                    if (res.data.success) {
                        this.setState(state => ({ found_student: null, success: { status: "Delete", message: "The Student Has Been Deleted Successfuly." } }))
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

    set_active_tab = (active_tab) => {
        this.setState({ active_tab })
    }

    componentDidMount() {
        Axios.get("http://localhost:3301/auth-service/students", { headers: { authorization: "Bearer " + this.props.token } })
            .then(res => {
                this.setState(state => ({ students: res.data.students }))
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

    render() {
        return (
            <div className="scol-agent-container">
                <div className="head">
                    <h1>Scol Agent</h1>
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

                <div className="tabs">
                    <div className="tabs-nav">
                        <button className={(this.state.active_tab === "update-student") ? 'active-tab' : null} onClick={() => { this.set_active_tab("update-student") }}>Update Student</button>
                        <button className={(this.state.active_tab === "subscribe-student") ? 'active-tab' : null} onClick={() => { this.set_active_tab("subscribe-student") }}>Subscribe Student</button>
                        <button className={(this.state.active_tab === "students-list") ? 'active-tab' : null} onClick={() => { this.set_active_tab("students-list") }}>Student's List</button>
                    </div>
                    <div className="tabs-body">
                        {
                            this.state.active_tab === "update-student"
                                ?
                                <ScolAgentFindStudent findStudent={this.findStudent} found_student={this.state.found_student} onUpdateInput={this.onUpdateInput} updateStudent={this.updateStudent} deleteStudent={this.deleteStudent} />
                                :
                                this.state.active_tab === "subscribe-student"
                                    ?
                                    <ScolAgentSubscribeStudent onInput={this.onInput} subscribeStudent={this.subscribeStudent} />
                                    :
                                    <ScolAgentStudentsList students={this.state.students} />
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({ ...store })
const mapDispatchToProps = (dispatch) => ({
    error_handler: (error) => dispatch(error_handler(error)),
    clear_error: () => dispatch(clear_error())
})

export default connect(mapStateToProps, mapDispatchToProps)(ScolAgent)