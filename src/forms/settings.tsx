import * as Fields from '@mas.eg/mas-forms-semantic-ui'
import * as React from 'react';
import * as ReactDom from 'react-DOM';

import {Container, Segment} from 'semantic-ui-react';
import { FieldPropTypes, FieldState } from '@mas.eg/mas-forms/src';
import { Grid, Icon, Label, Menu, Table } from 'semantic-ui-react';

import {AppMode} from '../actions/settings';
import {Form} from '@mas.eg/mas-forms-semantic-ui';
import { FormPropTypes } from '@mas.eg/mas-forms/src';
import FormsyRadio from '@mas.eg/mas-forms-semantic-ui/src/FormsyRadio';

export interface SettingsFormProps extends FormPropTypes {
    initModel?:{},
    onSubmit?:(model:any,reset?,update?)=>{}
}

export interface SettingsLayersState {
    show: boolean,
}
export default class SettingsLayers extends React.Component<SettingsFormProps,SettingsLayersState> {
    constructor(props) {
        super(props);
        this.state = {show: false };
        this.handelClick = this.handelClick.bind(this);
        this.handelSubmit=this.handelSubmit.bind(this);       
    }
    handelClick() {
        this.setState({
            show: !this.state.show
        });
    }
    handelSubmit(model){
        console.dir({model});
        if(this.props.onSubmit)
            this.props.onSubmit(model);
        return model;
    }
    render() {
        return <Segment textAlign="center" >
        <Form initModel={this.props.initModel} size="samll" onValid={()=>{this.setState({show:true});console.log('valid')}} onInvalid={()=>{console.log('invalid'),this.setState({show:false})}}
            onSubmit={this.handelSubmit}>
         <h1 style={styles.h1}>Settings</h1>
         <br/>
              <Grid stackable name="group1" >
              <Fields.Select labeled label="Mode" options={[{key:1,value:AppMode.MOBILE,text:"mobile"},{key:2,value:AppMode.TV,text:"tv"}]} name="mode">
              </Fields.Select>
                    <Fields.Input placeholder="Server" name="server"/>
                    <Fields.Input name="port" placeholder="Port" />
                    <Fields.Input name="namespace" placeholder="namespace or channel" />
                    <Fields.Input name="timeOut" placeholder="TimeOut" />
               </Grid >
                <Table stackable >                    
                    <Table.Body>
                    <Table.Row>
                       <Table.Cell> الخطوط</Table.Cell>
                        <Table.Cell> <Fields.Input placeholder="maxZoom"  name="maxZoomP" /></Table.Cell>
                       <Table.Cell><Fields.Input placeholder="minZoom"  name="minZoomP" /></Table.Cell>
                        <Table.Cell><Fields.Input placeholder="features"  name="featuresP" /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell> المحابس</Table.Cell>
                       <Table.Cell> <Fields.Input placeholder="maxZoom" name="maxZoomV" /></Table.Cell>
                        <Table.Cell><Fields.Input placeholder="minZoom" name="minZoomV" /></Table.Cell>
                        <Table.Cell><Fields.Input placeholder="features" name="featuresV" /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                    <Table.Cell> المحطات</Table.Cell>
                       <Table.Cell> <Fields.Input placeholder="maxZoom" name="maxZoomS" /></Table.Cell>
                        <Table.Cell><Fields.Input placeholder="minZoom" name="minZoomS" /></Table.Cell>
                        <Table.Cell><Fields.Input placeholder="features" name="featuresS" /></Table.Cell>
                    </Table.Row>
                     <Table.Row>
                     <Table.Cell> الحدود</Table.Cell>
                       <Table.Cell> <Fields.Input placeholder="maxZoom" name="maxZoomB" /></Table.Cell>
                        <Table.Cell><Fields.Input placeholder="minZoom" name="minZoomB" /></Table.Cell>
                        <Table.Cell><Fields.Input placeholder="features" name="featuresB" /></Table.Cell>
                    </Table.Row>
                    </Table.Body>
                </Table>
                <Fields.Button content="submit" primary name="button" type="submit" disabled={!this.state.show}/>
        </Form>
    </Segment>
    }
}
var styles: React.CSSProperties = {    
      h1:{
        textAlign:'center',
        backgroundColor: '#7facd0',
        height: 47,
        padding: 5,
    },

}

