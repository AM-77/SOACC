import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { load_user, error_handler } from '../redux-store/actions/authActionCreator'
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
                    .catch(err => this.props.error_handler(err))

                return <p>loading ...</p>
            } else {
                return <Redirect to="/login" />
            }
        }

    }
}

const mapStateToProps = (store) => ({ ...store })

const dispatchStateToProps = (dispatch) => {
    return {
        load_user: (token, user) => dispatch(load_user(token, user)),
        error_handler: (error) => dispatch(error_handler(error))
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(IsLogged)