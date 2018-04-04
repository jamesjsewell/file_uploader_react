
import React, { Component } from "react";

class ItemLayout extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleSubmit, theItem, collection, deleteItem, editing, selected } = this.props;

        return (
            <div>

                {editing && theItem._id === selected._id ? <div><p>see form above</p><br /></div> :


                    <div style={{ width: `20%` }} >

                        {editing ? null :
                            <div>
                                <button style={{ float: 'right' }} onClick={() => this.props.deleteItem(collection, theItem._id)}>x</button>
                                <button style={{ float: 'right' }} onClick={() => this.props.editItem(collection, theItem._id)}>edit</button>
                            </div>}

                        <strong>{theItem.name}</strong>
                        <p>{theItem.description}</p> <br />
                    </div>

                }

            </div>
        );
    }
}

export default ItemLayout
