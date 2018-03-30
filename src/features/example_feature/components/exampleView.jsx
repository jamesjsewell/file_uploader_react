import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../controller"

@connect(
    state => controller.selector(state),
    dispatch => ({
        actions: bindActionCreators(controller, dispatch)
    })
)

class TestView extends Component {

    componentWillReceiveProps(nextProps){
      console.log(nextProps.something)
    }

    render() {

        return (
          <div>
            <div>example feature</div>
            <button onClick={()=>{this.props.something? this.props.actions.doSomethingElse() : this.props.actions.doSomething()}}>create</button>
          </div>
        )
    }
}

export default withRouter(TestView)