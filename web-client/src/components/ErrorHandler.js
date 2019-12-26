import React, { Component } from 'react'
import { connect } from 'react-redux'
import { error_handler } from '../redux-store/actions/authActionCreator'

class ErrorHandler extends Component {
    render() {
        console.log("ErrorHandler props:", this.props)
        return (
            <React.Fragment>{this.props.children}</React.Fragment>
        )
    }
}


const mapStateToProps = (store) => ({ ...store })
const dispatchStateToProps = (dispatch) => {
    return {
        error_handler: (error) => dispatch(error_handler(error))
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(ErrorHandler)