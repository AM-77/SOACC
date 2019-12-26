import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout } from './../redux-store/actions/authActionCreator'
import univ_logo from '../assets/univ-logo.png'

class NavBar extends Component {

    logout = () => {
        localStorage.removeItem('app_token')
        this.props.logout()
    }

    render() {
        return (
            <div className="navbar-container">
                <div className="nav-logo">
                    <img src={univ_logo} alt="The University's Logo" />
                </div>
                {
                    this.props.islogged
                        ?
                        <div className="nav-logged">
                            <h4 className="title"><b>Account:</b> <span>{this.props.user.email}</span></h4>
                            <div className="nav-links">
                                <button className="logout-btn" onClick={this.logout}>logout</button>
                            </div>
                        </div>
                        :
                        <div className="nav-links">
                            <NavLink activeClassName="active" className="nav-link" to="/login">Login</NavLink>
                            <NavLink activeClassName="active" className="nav-link" to="/subscribe">Subscribe</NavLink>
                        </div>


                }
            </div>
        )
    }
}

const mapStateToProps = (store) => {
    return { ...store }
}

const dispatchStateToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(NavBar)
