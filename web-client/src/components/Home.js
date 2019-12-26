import React, { Component } from 'react'
import { connect } from 'react-redux'
import IsLogged from './IsLogged'
import DepChef from './DepChef'
import ScolAgent from './ScolAgent'
import LibCons from './LibCons'
import LibAgent from './LibAgent'

class Home extends Component {
    render() {
        console.log("Home props: ", this.props)
        return <IsLogged>
            <div>
                {this.props.user
                    ?
                    this.props.user.type === "dep-chef"
                        ?
                        <DepChef token={this.props.token} />
                        :
                        this.props.user.type === "scol-agent"
                            ?
                            <ScolAgent token={this.props.token} />
                            :
                            this.props.user.type === "lib-cons"
                                ?
                                <LibCons token={this.props.token} />
                                :
                                <LibAgent token={this.props.token} />
                    :
                    <p>User Does Not Exist.</p>
                }
            </div>
        </IsLogged>
    }
}

const mapStateToProps = (store) => {
    return { ...store }
}

export default connect(mapStateToProps)(Home)