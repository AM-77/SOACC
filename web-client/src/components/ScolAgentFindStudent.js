import React, { Component } from 'react'

export default class ScolAgentFindStudent extends Component {
    render() {
        return (
            <div className="update-container">
                <h2 className="title">Find & Update A Student</h2>
                <div>
                    <h4 className="check-label">Search By Matricule: </h4>
                    <div className="update-field">
                        <label htmlFor="search-mat" className="update-label">matricule: </label>
                        <input id="search-mat" className="search-input" type="text" onChange={this.props.findStudent} name="mat" placeholder="Enter a student's matricule" />
                    </div>
                </div>
                <div>
                    {
                        !this.props.found_student
                            ?
                            <h4 className="check-label">No Student Was Found</h4>
                            :
                            <div className="student-found">
                                <h4 className="check-label">Search Result: </h4>
                                <form>

                                    <div className="update-field">
                                        <label htmlFor="mat" className="update-label">matricule: </label>
                                        <input id="mat" defaultValue={this.props.found_student.mat} className="update-input" type="text" onChange={this.props.onUpdateInput} name="mat" placeholder="Enter a student's matricule" />
                                    </div>

                                    <div className="update-field">
                                        <label htmlFor="email" className="update-label">email: </label>
                                        <input id="email" defaultValue={this.props.found_student.email} className="update-input" type="email" onChange={this.props.onUpdateInput} name="email" placeholder="Enter a student's email" />
                                    </div>

                                    <div className="update-field">
                                        <label htmlFor="first_name" className="update-label">first name: </label>
                                        <input id="first_name" defaultValue={this.props.found_student.first_name} className="update-input" type="text" onChange={this.props.onUpdateInput} name="first_name" placeholder="Enter a student's first name" />
                                    </div>

                                    <div className="update-field">
                                        <label htmlFor="last_name" className="update-label">last name: </label>
                                        <input id="last_name" defaultValue={this.props.found_student.last_name} className="update-input" type="text" onChange={this.props.onUpdateInput} name="last_name" placeholder="Enter a student's last name" />
                                    </div>

                                    <div className="update-field">
                                        <label htmlFor="birthdate" className="update-label">birthdate: </label>
                                        <input id="birthdate" defaultValue={this.props.found_student.birthdate} className="update-input" type="date" min="1960-01-01" max={new Date().getFullYear() - 16 + "-01-01"} onChange={this.props.onUpdateInput} name="birthdate" placeholder="Enter a student's birthdate" />
                                    </div>

                                    <div className="update-field">
                                        <label htmlFor="year" className="update-label">year: </label>
                                        <select id="year" defaultValue={this.props.found_student.year} className="update-input" name="year" onChange={this.props.onUpdateInput} placeholder="Enter student's year" >
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
                                        <select id="dep" defaultValue={this.props.found_student.dep} className="update-input" name="dep" onChange={this.props.onUpdateInput} placeholder="Enter a student's departements" >
                                            <option value="STIW">STIW</option>
                                            <option value="GL">GL</option>
                                            <option value="STIC">STIC</option>
                                            <option value="RSD">RSD</option>
                                        </select>
                                    </div>

                                    <div className="update-field">
                                        <label htmlFor="phone" className="update-label">phone number: </label>
                                        <input id="phone" defaultValue={this.props.found_student.links.phone} className="update-input" type="phone" onChange={this.props.onUpdateInput} name="phone" placeholder="Enter a student's phone number" />
                                    </div>

                                    <div className="update-field">
                                        <label htmlFor="facebook" className="update-label">facebook: </label>
                                        <input id="facebook" defaultValue={this.props.found_student.links.facebook} className="update-input" type="text" onChange={this.props.onUpdateInput} name="facebook" placeholder="Enter a student's facebook" />
                                    </div>

                                    <div className="update-field">
                                        <label htmlFor="twitter" className="update-label">twitter: </label>
                                        <input id="twitter" defaultValue={this.props.found_student.links.twitter} className="update-input" type="text" onChange={this.props.onUpdateInput} name="twitter" placeholder="Enter a student's twitter" />
                                    </div>

                                    <div className="update-field">
                                        <label htmlFor="second_email" className="update-label">secondery email: </label>
                                        <input id="second_email" defaultValue={this.props.found_student.links.second_email} className="update-input" type="email" onChange={this.props.onUpdateInput} name="second_email" placeholder="Enter a student's secondery email" />
                                    </div>

                                    <button onClick={this.props.updateStudent}>Update Student</button>
                                    <button className="delete-btn" onClick={this.props.deleteStudent}>Delete Student</button>
                                </form>
                            </div>
                    }
                </div>
            </div>
        )
    }
}
