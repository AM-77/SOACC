import React, { Component } from 'react'
import { connect } from 'react-redux'
import { error_handler, clear_error } from '../redux-store/actions/authActionCreator'
import Axios from 'axios'

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
            userUpdated: false
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

                <div className="update-container">
                    <h2 className="title">Find & Update A Student</h2>
                    <div>
                        <h4 className="check-label">Search By Matricule: </h4>
                        <div className="update-field">
                            <label htmlFor="search-mat" className="update-label">matricule: </label>
                            <input id="search-mat" className="search-input" type="text" onChange={this.findStudent} name="mat" placeholder="Enter a student's matricule" />
                        </div>
                    </div>
                    <div>
                        {
                            !this.state.found_student
                                ?
                                <h4 className="check-label">No Student Was Found</h4>
                                :
                                <div className="student-found">
                                    <h4 className="check-label">Search Result: </h4>
                                    <form>

                                        <div className="update-field">
                                            <label htmlFor="mat" className="update-label">matricule: </label>
                                            <input id="mat" defaultValue={this.state.found_student.mat} className="update-input" type="text" onChange={this.onUpdateInput} name="mat" placeholder="Enter a student's matricule" />
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="email" className="update-label">email: </label>
                                            <input id="email" defaultValue={this.state.found_student.email} className="update-input" type="email" onChange={this.onUpdateInput} name="email" placeholder="Enter a student's email" />
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="first_name" className="update-label">first name: </label>
                                            <input id="first_name" defaultValue={this.state.found_student.first_name} className="update-input" type="text" onChange={this.onUpdateInput} name="first_name" placeholder="Enter a student's first name" />
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="last_name" className="update-label">last name: </label>
                                            <input id="last_name" defaultValue={this.state.found_student.last_name} className="update-input" type="text" onChange={this.onUpdateInput} name="last_name" placeholder="Enter a student's last name" />
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="birthdate" className="update-label">birthdate: </label>
                                            <input id="birthdate" defaultValue={this.state.found_student.birthdate} className="update-input" type="date" min="1960-01-01" max={new Date().getFullYear() - 16 + "-01-01"} onChange={this.onUpdateInput} name="birthdate" placeholder="Enter a student's birthdate" />
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="year" className="update-label">year: </label>
                                            <select id="year" defaultValue={this.state.found_student.year} className="update-input" name="year" onChange={this.onUpdateInput} placeholder="Enter student's year" >
                                                <option value="L1">L1</option>
                                                <option value="L2">L2</option>
                                                <option value="L3">L3</option>
                                                <option value="M1">M1</option>
                                                <option value="M2">M2</option>
                                                <option value="D1">D1</option>
                                                <option value="D2">D2</option>
                                                <option value="D3">D3</option>
                                            </select>
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="dep" className="update-label">departement: </label>
                                            <select id="dep" defaultValue={this.state.found_student.dep} className="update-input" name="dep" onChange={this.onUpdateInput} placeholder="Enter a student's departements" >
                                                <option value="STIW">STIW</option>
                                                <option value="GL">GL</option>
                                                <option value="STIC">STIC</option>
                                                <option value="RSD">RSD</option>
                                            </select>
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="phone" className="update-label">phone number: </label>
                                            <input id="phone" defaultValue={this.state.found_student.links.phone} className="update-input" type="phone" onChange={this.onUpdateInput} name="phone" placeholder="Enter a student's phone number" />
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="facebook" className="update-label">facebook: </label>
                                            <input id="facebook" defaultValue={this.state.found_student.links.facebook} className="update-input" type="text" onChange={this.onUpdateInput} name="facebook" placeholder="Enter a student's facebook" />
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="twitter" className="update-label">twitter: </label>
                                            <input id="twitter" defaultValue={this.state.found_student.links.twitter} className="update-input" type="text" onChange={this.onUpdateInput} name="twitter" placeholder="Enter a student's twitter" />
                                        </div>

                                        <div className="update-field">
                                            <label htmlFor="second_email" className="update-label">secondery email: </label>
                                            <input id="second_email" defaultValue={this.state.found_student.links.second_email} className="update-input" type="email" onChange={this.onUpdateInput} name="second_email" placeholder="Enter a student's secondery email" />
                                        </div>

                                        <button onClick={this.updateStudent}>Update Student</button>
                                        <button className="delete-btn" onClick={this.deleteStudent}>Delete Student</button>
                                    </form>
                                </div>
                        }
                    </div>
                </div>

                <div className="subscribe-student-container">
                    <h2 className="title">Subscribe A Student</h2>
                    <div className="subscribe-student-form">
                        <form>
                            <input type="text" onChange={this.onInput} name="mat" placeholder="Enter a student's matricule" />
                            <input type="email" onChange={this.onInput} name="email" placeholder="Enter a student's email" />
                            <input type="text" onChange={this.onInput} name="first_name" placeholder="Enter a student's first name" />
                            <input type="text" onChange={this.onInput} name="last_name" placeholder="Enter a student's last name" />
                            <input type="date" min="1960-01-01" max={new Date().getFullYear() - 16 + "-01-01"} onChange={this.onInput} name="birthdate" placeholder="Enter a student's birthdate" />
                            <select name="year" onChange={this.onInput} placeholder="Enter student's year" >
                                <option value="L1">L1</option>
                                <option value="L2">L2</option>
                                <option value="L3">L3</option>
                                <option value="M1">M1</option>
                                <option value="M2">M2</option>
                                <option value="D1">D1</option>
                                <option value="D2">D2</option>
                                <option value="D3">D3</option>
                            </select>
                            <select name="dep" onChange={this.onInput} placeholder="Enter a student's departements" >
                                <option value="STIW">STIW</option>
                                <option value="GL">GL</option>
                                <option value="STIC">STIC</option>
                                <option value="RSD">RSD</option>
                            </select>
                            <input type="phone" onChange={this.onInput} name="phone" placeholder="Enter a student's phone number" />
                            <input type="text" onChange={this.onInput} name="facebook" placeholder="Enter a student's facebook" />
                            <input type="text" onChange={this.onInput} name="twitter" placeholder="Enter a student's twitter" />
                            <input type="email" onChange={this.onInput} name="second_email" placeholder="Enter a student's secondery email" />
                            <div className="clear"></div>
                            <button onClick={this.subscribeStudent}>Subscribe Student</button>
                        </form>
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

export default connect(mapStateToProps, dispatchStateToProps)(ScolAgent)