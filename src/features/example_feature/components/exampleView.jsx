import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import { withRouter } from "react-router"
import * as controller from "../controller"
import ItemLayout from "./item.jsx"
import ItemForm from "./itemForm.jsx"

@connect(
  state => controller.selector(state),
  dispatch => ({
    actions: bindActionCreators(controller, dispatch)
  })
)

class TestView extends Component {

  constructor(props) {
    super(props)
    this.CRUD = this.props.actions.CRUD
    this.CRUD('read', {collection: this.props.itemCollection})
  }
  
  componentWillReceiveProps(nextProps){

  }

  renderItems() {
    var renderedItems = []
    for (var i = 0; i < this.props.items.length; i++) {
      var theItem = this.props.items[i].attributes

      renderedItems.push(
        <ItemLayout key={`item${i}`} theItem={theItem} collection={this.props.itemCollection} CRUD={this.CRUD.bind(this)} editing={this.props.editingItem} selected={this.props.selectedItem} />
      )
    }

    return renderedItems
  }

  render() {

    var formProps = {

      formType: this.props.editingItem ? "edit" : "create",
      CRUD: this.CRUD.bind(this),
      model: this.props.item,
      item: this.props.editingItem ? this.props.selectedItem : null,
      itemCollection: this.props.itemCollection

    }

    return (
      <div>

        {this.props.editingItem ?
          <div>
            <strong>edit</strong>
            <ItemForm {...formProps} />
          </div>
          :
          <div>
            <strong>create item</strong>
            <ItemForm {...formProps} />
          </div>
        }

        {this.props.message? <div> {this.props.message} </div> : null}

        <br />
        <div>{this.props.items ? this.renderItems() : null}</div>

      </div>)
  }
}

export default withRouter(TestView)