import React, { Component } from "react";
import { Form, Field, reduxForm, change, reset } from "redux-form";
import { alphaNumeric, required, shouldAsyncValidate, asyncValidate } from "../../util/forms/formValidation.js"
import { TextField, TextArea } from "../../util/forms/formFields.js"
import FormTemplate from "../../util/forms/formTemplate.jsx";

const afterSubmit = (result, dispatch, props) => {
    props.reset();
    props.untouch(["name", "description"]);

}

const fields = [

    { type: 'text', name: 'name', label: 'item name', placeholder: 'enter item name', component: TextField, validate: [required, alphaNumeric] },
    { type: 'textarea', name: 'description', label: 'item description', placeholder: 'enter description', component: TextArea, validate: [required] }

]

class EditItemForm extends Component {
    constructor(props) {
        super(props);
    }

    handleFormSubmit(formProps) {
        var userInput = formProps;
        
        if (
            Object.keys(formProps).length > 0 &&
            formProps.constructor === Object
        ) { 

            
            this.props.editItem(this.props.itemCollection, userInput)

        }

    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <FormTemplate doThisOnSubmit={this.handleFormSubmit.bind(this)} fieldsArray={fields} {...this.props} />
        );
    }
}

export default reduxForm({
    form: "editItem",
    fields: ["name"],
    asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'editItem') },
    asyncBlurFields: ["name"],
    shouldAsyncValidate,
    onSubmitSuccess: afterSubmit
})(EditItemForm);
