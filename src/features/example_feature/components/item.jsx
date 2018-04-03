
import React, { Component } from "react";

class ItemLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, theItem, collection, deleteItem } = this.props;

        return (
            <div> 
                <div style={{width: `20%`}} >
                    <button style={{float: 'right'}} onClick={()=> this.props.deleteItem(collection, theItem._id) }>x</button>
                </div>
                <strong>{theItem.name}</strong>
                <p>{theItem.description}</p><br/></div>
        );
    }
}

export default ItemLayout
