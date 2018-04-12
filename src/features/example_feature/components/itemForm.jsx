import React, { Component } from "react";
import { Form, Field, reduxForm, change, reset } from "redux-form";
import { alphaNumeric, required, shouldAsyncValidate, asyncValidate } from "../../util/forms/formValidation.js"
import { TextField, TextArea } from "../../util/forms/formFields.js"
import FormTemplate from "../../util/forms/formTemplate.jsx";

const afterSubmit = (result, dispatch, props) => {
    props.reset();
    props.untouch(["name", "description"]);

}

var fieldValues = {}

class ItemForm extends Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.state.initName = ''
        this.state.initDescription = ''

        this.fields = [

            { type: 'text', name: 'name', label: 'item name', placeholder: 'enter item name', component: TextField, validate: [required, alphaNumeric] },
            { type: 'textarea', name: 'description', label: 'item description', placeholder: 'enter description', component: TextArea, validate: [required] }
        
        ]

    }

    componentWillReceiveProps(nextProps){
        
        if(this.props.item != nextProps.item && nextProps.item){
            
            fieldValues.name = nextProps.item.name
            fieldValues.description = nextProps.item.description
            
        }

        if(this.props.formType === "edit" && nextProps.formType === "create" ){

            fieldValues.name = ""
            fieldValues.description = ""
        }

        if(this.props.formType === "create" && nextProps.formType === "edit"){
            this.props.reset()
        }
    }

    doThisOnSubmit(formProps) {
      
        var userInput = formProps;
       
        if (
            Object.keys(formProps).length > 0 &&
            formProps.constructor === Object
        ) { 

            switch(this.props.formType){
                case 'create': {
                   
                    var item = new this.props.model(userInput)
                    this.props.CRUD('create', {collection: this.props.itemCollection, item: item})
                    break
                }

                case 'edit': {
                    this.props.CRUD('update', {collection: this.props.itemCollection, item: this.props.item, info: userInput})  
                    break
                }
            }    
        }
    }

    renderFields() {
       
        var renderedFields = []

        for (var i = 0; i < this.fields.length; i++) {
            var field = this.fields[i]
            var fieldProps = field
          
            renderedFields.push(<Field {...fieldProps} key={`field${i}`}/>)
        }

        return renderedFields
    }

    render() {

        const { handleSubmit } = this.props

        return (
            <form
                onSubmit={handleSubmit(this.doThisOnSubmit.bind(this))}
            >

                {this.renderFields()}


                <button type="submit">
                    submit
                </button>

            </form >
        );
    }
}

export default reduxForm({
    form: 'itemForm',
    fields: ["name"],
    asyncValidate: (values, dispatch, validationType)=>{ return asyncValidate(values, dispatch, validationType, 'itemForm') },
    asyncBlurFields: ["name"],
    shouldAsyncValidate,
    onSubmitSuccess: afterSubmit,
    initialValues: fieldValues
})(ItemForm);
