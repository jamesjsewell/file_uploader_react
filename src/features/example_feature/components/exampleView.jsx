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
    this.props.actions.fetch_items(this.props.itemCollection)
  }

  componentWillReceiveProps(nextProps) {
    
  }

  renderItems() {
    var renderedItems = []
    for (var i = 0; i < this.props.items.length; i++) {
      var theItem = this.props.items[i].attributes

      renderedItems.push(
        <ItemLayout key={`item${i}`} theItem={theItem} collection={this.props.itemCollection}  editItem={this.props.actions.edit_item.bind(this)} deleteItem={this.props.actions.delete_item.bind(this)} editing={this.props.editingItem} />
      )
    }

    return renderedItems
  }

  render() {
    console.log('editing?', this.props.editingItem)
    var formProps = {

      formType: this.props.editingItem? "edit" : "create",
      createItem: this.props.actions.create_item.bind(this),
      updateItem: this.props.actions.update_item.bind(this),
      model: this.props.item,
      item: this.props.editingItem? this.props.selectedItem : null,
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

        <br />
        <div>{this.props.items ? this.renderItems() : null}</div>

      </div>)
  }
}

export default withRouter(TestView)