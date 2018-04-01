import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../controller"
import ItemForm from "./itemForm.jsx"

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class TestView extends Component {

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.something)
  }

  render() {

    return (
      <div>

        <ItemForm />
    
      </div>)
    }
}

export default withRouter(TestView)