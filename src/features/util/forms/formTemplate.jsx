import React, { Component } from "react";
import { Form, Field, reduxForm } from "redux-form";


class FormTemplate extends Component {
    constructor(props) {
        super(props);
    }

    renderFields() {
       
        var renderedFields = []

        for (var i = 0; i < this.props.fieldsArray.length; i++) {
            var field = this.props.fieldsArray[i]
            var fieldProps = field
          
            renderedFields.push(<Field {...fieldProps} key={`field${i}`}/>)
        }

        return renderedFields
    }

    render() {
        const { handleSubmit, doThisOnSubmit } = this.props;

        return (
            <form
                onSubmit={handleSubmit(doThisOnSubmit.bind(this))}
            >

                {this.renderFields()}


                <button type="submit">
                    submit
                </button>

            </form >
        );
    }
}

export default FormTemplate


// export default reduxForm({
//     form: "itemForm",
//     fields: ["name"],
//     asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
//     asyncBlurFields: ["name"],
//     shouldAsyncValidate,
//     onSubmitSuccess: afterSubmit
// })(ItemForm);

