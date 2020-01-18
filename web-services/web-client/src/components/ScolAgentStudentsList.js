import React, { Component } from 'react'

export default class ScolAgentStudentsList extends Component {
    render() {
        return (
            <div className="student-list-container">
                <h2 className="title">List Of The Subscribed Students</h2>
                {
                    this.props.students.length === 0
                        ?
                        <p className="no-student">No Student Was Subscribed Yet.</p>
                        :
                        <div>
                            {
                                this.props.students.map((student, index) => {
                                    return (
                                        <div key={index} className="student">
                                            <p><b>matricule:</b> {student.mat}</p>
                                            <p><b>first name:</b> {student.first_name}</p>
                                            <p><b>last name:</b> {student.last_name}</p>
                                            <p><b>birthdate:</b> {student.birthdate}</p>
                                            <p><b>email:</b> {student.email}</p>
                                            <p><b>year:</b> {student.year}</p>
                                            <p><b>departemnet:</b> {student.dep}</p>
                                            <p><b>phone:</b> {student.links.phone ? student.links.phone : "No phone number."}</p>
                                            <p><b>facebook:</b> {student.links.facebook ? <a href={student.links.facebook}>{student.links.facebook}</a> : "No facebook account."}</p>
                                            <p><b>twitter:</b> {student.links.twitter ? <a href={student.links.twitter}>{student.links.twitter}</a> : "No twitter account."}</p>
                                            <p><b>secondery email:</b> {student.links.second_email ? student.links.second_email : "No secondery email."}</p>
                                            <p><b>joined library:</b> {student.joinedlib ? "Joined" : "Not Joined."}</p>
                                        </div>
                                    )
                                })
                            }
                            <div className="clear"></div>
                        </div>
                }
            </div>
        )
    }
}















