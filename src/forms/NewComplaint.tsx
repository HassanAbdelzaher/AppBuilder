import * as Fields from '@mas.eg/mas-forms-semantic-ui';
import * as MasForms from '@mas.eg/mas-forms/src';
import * as React from 'react';
import * as ReactDom from 'react-DOM';
import * as models from '@mas.eg/mas-data-models/server'

import { FieldPropTypes, FieldState } from '@mas.eg/mas-forms/src';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'

import {Form} from '@mas.eg/mas-forms-semantic-ui';
import { FormPropTypes } from '@mas.eg/mas-forms/src';

export interface NewComplaintFormProps extends FormPropTypes {
    busy?: boolean,
    error?: string,
    complaintTypes?: Array<models.ComplaintType>
    actionTypes?: Array<models.ComplaintType>
}

export interface ComplaintFormState {
    show: boolean
}
var  types = [
  {
    text: 'Jenny Hess',
    value: 'Jenny Hess',

  },
  {
    text: 'fdgdfgdgd',
    value: 'fdgdfgdgd',

  },
  {
    text: 'Hess',
    value: ' Hess',

  },
]

export default class ComplaintForm extends React.Component<any,ComplaintFormState> {
    constructor(props) {
        super(props);
        this.state = {  show: false};
        this.handelClick = this.handelClick.bind(this);
    }
    handelClick() {
        console.log("click");
        this.setState({
            show: !this.state.show
        });
    }
    render() {
        return <div>
        <Form  size="small" onValid={()=>{this.setState({show:true});console.log('valid')}} onInvalid={()=>{console.log('invalid'),this.setState({show:false})}}
            onSubmit={(data) => {
            console.dir({data});
            return data;
        }}>
         <h1>Complaint</h1>
               <Fields.Input placeholder="Id" name="id" inline width={8}/>
              <Fields.Group widths='equal' name="group1" >
                    <Fields.Input  name="desc" placeholder="الوصف" />
                     <Fields.Input  name="adress" placeholder="العنوان" />
               </Fields.Group >
                <Fields.Group widths='equal' name="group2">
                        <Fields.Select placeholder="النوع" options={types} name="type"/>
                        <Fields.Select placeholder="الاجراء" options={types} name="action"/>
                </Fields.Group >
                <Fields.Button content="submit" primary name="button" type="submit" disabled={!this.state.show}/>

        </Form>
    </div>
    }
}