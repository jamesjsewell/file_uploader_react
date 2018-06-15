import React, { Component } from "react"
import UppyDashboardComponent from "./UppyDashboard.jsx"

class UppyView extends Component {

  constructor(props) {
    super(props)
  }


  render() {

    return (

      <div>

        <div className="container">

          <div className="row">

            <div className="twelve columns">
              <UppyDashboardComponent />
            </div>

          </div>

        </div>

      </div>)
  }
}

export default UppyView