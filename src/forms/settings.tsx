import * as React from 'react';

import {Form, FormPropTypes} from '@mas.eg/mas-forms/src';
import {TextField, Toggle} from '@mas.eg/mas-forms-fields-material-ui'

export interface SettingsFormProps extends FormPropTypes {}
export class SettingsForm extends React.Component < SettingsFormProps,
any > {
    constructor() {
        super();
        this.state = {
            canSubmit: true
        }
        this.validateForm = this
            .validateForm
            .bind(this);
        this.onChange = this
            .onChange
            .bind(this);
    }
    validateForm(values) {
        if (!values.server) {
            this.setState({
                validationErrors: {
                    server: 'Has no value'
                }
            });
        } else {
            this.setState({validationErrors: {}});
        }
    }
    onChange(modelmade, isChanged) {
        this.validateForm(modelmade);
        if (this.props.onChange) 
            this.props.onChange(modelmade, isChanged);
        return modelmade
    }
    render() {
        const validationErrors = this.state.validationErrors;
        const props = {
            onChange: this.onChange,
            validationErrors: this.state.validationErrors,
        }
        const formProps = {
            ...this.props,
            ...props
        };
        return <Form {...formProps}>
            <TextField
                required
                validations={{
                isUrl: true
            }}
                name="server"
                floatingLabelText="server"
                hintText="الخادم"/>
            <TextField
                required
                validations={{
                isInt: true
            }}
                name="port"
                floatingLabelText="port"
                hintText="رقم المنفذ"/>
            <TextField
                required
                name="namespace"
                hintText="المجموعة"/>
            <Toggle name="navigate"/>
           
            <button type="submit" disabled={!this.state.canSubmit}>Submit</button>
        </Form>
    }
}