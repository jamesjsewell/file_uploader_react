import React, { Component } from "react";
import { Field, reduxForm } from "redux-form"

//example for the outer div, for styling based on state: className={asyncValidating ? 'async-validating' : ''} required={required} error={error && touched ? true : false}
export const FormField = ({
    input,
    label,
    type,
    placeholder,
    required,
    asyncValidation,
    initialValues,
    meta: { touched, error, warning, value, asyncValidating, pristine }
}) => (
    <div>
        <label style={{display: 'block'}}>{label}</label>
        <input
            name={input.name}
            type={type}
            value={input.value}
            onChange={input.onChange}
            placeholder={placeholder}
            onBlur={input.onBlur}
            
        />
        {touched &&
            ((error &&
                <div>
                    <span>{error}</span>
                </div>) ||
                (warning &&
                    <div>
                        <span>{warning}</span>
                    </div>))}
    </div>
)