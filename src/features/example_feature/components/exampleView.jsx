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

  constructor(props){
    super(props)
    this.props.actions.fetch_items(this.props.itemCollection)
  }

  componentWillReceiveProps(nextProps) {

  }

  renderItems(){
    var renderedItems = []
    for(var i = 0; i < this.props.items.length; i++){
      var theItem = this.props.items[i].attributes
      renderedItems.push(<div key={`item${i}`}><p>{theItem.name}</p><p>{theItem.description}</p><br/></div>)
    }
  
    return renderedItems
  }

  render() {

    return (
      <div>

        <ItemForm createItem={this.props.actions.create_item.bind(this)} item={this.props.item} itemCollection={this.props.itemCollection}/>

        <div>{this.props.items? this.renderItems() : null}</div>
    
      </div>)
    }
}

export default withRouter(TestView)