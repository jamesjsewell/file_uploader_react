
import React, { Component } from "react";
import {
	Segment
} from "semantic-ui-react";

class ItemLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, theItem, collection, deleteItem, editing, selected } = this.props;

        return (
            <div className="item_wrapper">

                {editing && theItem._id === selected._id ? <div><p>see form above to edit</p><br /></div> :


                    <div className="item">

                        {editing ? null :
                            <div className="buttons_wrapper">
                                <button onClick={() => this.props.CRUD('delete', {collection: collection, id: theItem._id})}>x</button>
                                <button onClick={() => this.props.CRUD('edit', {collection: collection, id: theItem._id})}>edit</button>
                            </div>}
    
                            <div className="attribute_wrapper">
                                <strong>title</strong>
                                <h4>{theItem.title}</h4>
                            </div>
                            
                            <div className="attribute_wrapper">
                                <strong>subtitle</strong>
                                <h5>{theItem.subtitle}</h5>
                            </div>

                            <div className="attribute_wrapper">
                                <strong>description</strong>
                                <p>{theItem.description}</p>
                            </div>
                      
                    </div>

                }

            </div>
        );
    }
}

export default ItemLayout
