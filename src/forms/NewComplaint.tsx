import * as Fields from '@mas.eg/mas-forms-semantic-ui';
import * as MasForms from '@mas.eg/mas-forms/src';
import * as React from 'react';
import * as ReactDom from 'react-DOM';
import * as models from '@mas.eg/mas-data-models/server'

import { Button, Icon, Label, Menu, Table } from 'semantic-ui-react'
import {Container, Segment} from 'semantic-ui-react';
import { FieldPropTypes, FieldState } from '@mas.eg/mas-forms/src';
import {captureAudio, captureImage, captureVideo} from './camera'

import {Form} from '@mas.eg/mas-forms-semantic-ui';
import { FormPropTypes } from '@mas.eg/mas-forms/src';

export interface NewComplaintFormProps extends FormPropTypes {
    busy?: boolean,
    error?: string,
    complaintTypes?: Array<models.ComplaintType>
    actionTypes?: Array<models.ComplaintType>
}

export interface ComplaintFormState {
    show: boolean,
    imageList:Array<string>,
    videoPath:string|object,
    audioPath:string|object
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

export default class ComplaintForm extends React.Component<NewComplaintFormProps,ComplaintFormState> {
    constructor(props) {
        super(props);
        this.state = {  
            show: false,
            imageList:[],
            videoPath:{}||"",
            audioPath:{}||""
        };
        this.handelClick = this.handelClick.bind(this);
        this.captureImage=this.captureImage.bind(this);
        this.captureImage=this.captureImage.bind(this);
        this.captureVideo=this.captureVideo.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handelClick() {
        console.log("click");
        this.setState({
            show: !this.state.show
        });
    }
    captureImage() {
        var data=captureImage((result:string)=>{
            let imageList=[...this.state.imageList,( 'data:image/png;base64,'+result)];
            this.setState({imageList});
        })
    }  
    captureVideo() {
        var data=captureVideo((result)=>{
            this.setState({videoPath : result})
        })
       }
    captureAudio() {
        var data=captureAudio((result)=>{
            this.setState({audioPath : result})
        })
     };
     handleSubmit(model,rset){         
       model.imageList=this.state.imageList;
        if(this.props.onSubmit){
            this.props.onSubmit(model,rset,null);
        }
         return model;
     }
    render() {
        return <div>
            <Segment textAlign="center" >
        <Form  size="small" onValid={()=>{this.setState({show:true});console.log('valid')}} onInvalid={()=>{console.log('invalid'),this.setState({show:false})}}
            onSubmit={this.handleSubmit}>
         <h1>Complaint</h1>
               <Fields.Input placeholder="Id" name="id"  width={8}/>
               <Fields.Input  name="DESCRIPTION" placeholder="الوصف" />
               <Fields.Input  name="ADDRESS" placeholder="العنوان" />
                <Fields.Select placeholder="الاجراء" options={types} name="ACTION"/>
                <Button onClick={this.captureImage.bind(this)} primary  content="captureImage" />
                <Button onClick={this.captureVideo.bind(this)} primary  content="captureVideo"/>
                <Button onClick={this.captureAudio.bind(this)} primary content="captureaudio"/>

                <Button content="submit" primary name="button" type="submit" disabled={!this.state.show}/>
                
        </Form>
        </Segment>
        <Segment>
        {
            this.state.imageList.map((imagePath)=>{
                return <img src={imagePath}/>
            })
        }
        </Segment>
    </div>
    }
}