import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Field, reduxForm, change, reset } from "redux-form";
import { Link } from "react-router-dom";
import _ from "underscore";
import { FormField } from "../../util/forms/formField.js"
import { alphaNumeric, required, shouldAsyncValidate, asyncValidate } from "../../util/forms/formValidation.js"

const afterSubmit = (result, dispatch, props) => {
    props.reset();
    props.untouch(["name", "description"]);

}

class ItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageIsOpen: false,
            message: null,
            description: ""
        };
    }

    componentWillMount() {

    }

    componentWillReceiveProps(nextProps) {


        // if (nextProps.values != this.props.values) {

        //     this.props.reset()
        // }
    }

    handleOpenMessage() {

    }

    handleFormSubmit(formProps) {
        var userInput = formProps;

        if (
            Object.keys(formProps).length > 0 &&
            formProps.constructor === Object
        ) {
            if (this.state.description) {
                userInput["description"] = this.state.description;
            }
            //this.props.doThisOnSubmit(userInput);

        }
    
    }

    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div>

                    <span>

                        <strong>Error!</strong> {this.props.errorUpdating}

                    </span>

                </div>
            );
        }
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <form
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
            >

                <Field
                    placeholder="item name"
                    name="name"
                    component={FormField}
                    type="text"
                    label={"name of item"}
                    validate={[alphaNumeric, required]}
                />

                {this.state.messageIsOpen
                    ? <div
                    >
                        {" "}{this.state.message}
                    </div>
                    : null}


                <div>
                    <label style={{ display: 'block' }}>item description</label>
                    <textarea
                        id="description"
                        as="div"
                        size="medium"
                        id="description"
                        name="description"
                        value={this.state.description}
                        //onChange={this.handleDescriptionChange.bind(this)}
                        placeholder={"enter a description for this item"}
                    />

                </div>


                <button type="submit">
                    submit
                </button>

            </form >
        );
    }
}

export default reduxForm({
    form: "itemForm",
    fields: ["name"],
    asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
    asyncBlurFields: ["name"],
    shouldAsyncValidate,
    onSubmitSuccess: afterSubmit
})(ItemForm);

