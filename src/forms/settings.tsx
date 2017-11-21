import * as Fields from '@mas.eg/mas-forms-semantic-ui'
import * as MasForms from '@mas.eg/mas-forms/src';
import * as React from 'react';
import * as ReactDom from 'react-DOM';

import {Container, Segment} from 'semantic-ui-react';
import { FieldPropTypes, FieldState } from '@mas.eg/mas-forms/src';
import { Grid, Icon, Label, Menu, Table } from 'semantic-ui-react';

import {Form} from '@mas.eg/mas-forms-semantic-ui';
import { FormPropTypes } from '@mas.eg/mas-forms/src';

export interface SettingsFormProps extends FormPropTypes {
    initModel?:{},
    onSubmit?:(model:any,reset?,update?)=>{}
}

export interface SettingsLayersState {
    show: boolean
}
export default class SettingsLayers extends React.Component<SettingsFormProps,SettingsLayersState> {
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
        return <Segment textAlign="center" >
        <Form initModel={this.props.initModel} ons size="samll" onValid={()=>{this.setState({show:true});console.log('valid')}} onInvalid={()=>{console.log('invalid'),this.setState({show:false})}}
            onSubmit={this.props.onSubmit}>
         <h1 style={styles.h1}>Settings</h1>
              <Grid stackable name="group1" >
                    <Fields.Input  placeholder="Server" name="server"/>
                    <Fields.Input  name="port" placeholder="Port" />
                    <Fields.Input  name="nameSpace" placeholder="nameSpace or channel" />
                    <Fields.Input  name="timeOut" placeholder="TimeOut" />
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

