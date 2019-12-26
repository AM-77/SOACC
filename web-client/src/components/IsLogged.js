import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { load_user, logout, clear_error } from '../redux-store/actions/authActionCreator'
import Axios from 'axios'

class IsLogged extends Component {

    render() {
        if (this.props.islogged) {
            return <React.Fragment>{this.props.children}</React.Fragment>
        }
        else {
            let token = localStorage.getItem("app_token")
            if (token) {
                Axios.get("http://localhost:3301/auth-service/", { headers: { authorization: "Bearer " + token } })
                    .then(res => {
                        this.props.load_user(token, res.data.user)
                    })
                    .catch(err => {
                        const error = {
                            status: err.response.status,
                            status_text: err.response.statusText,
                            message: err.response.data.message
                        }
                        this.props.logout(error)
                        console.clear()
                        setTimeout(() => {
                            this.props.clear_error()
                        }, 3000)
                    })

                return <p>loading ...</p>
            } else {
                return <Redirect to="/login" />
            }
        }

    }
}

const mapStateToProps = (store) => ({ ...store })

const mapDispatchToProps = (dispatch) => ({
    load_user: (token, user) => dispatch(load_user(token, user)),
    clear_error: () => dispatch(clear_error()),
    logout: () => dispatch(logout())
})

export default connect(mapStateToProps, mapDispatchToProps)(IsLogged)