import * as React from 'react';

import {Form, FormPropTypes} from '@mas.eg/mas-forms/src';
import {TextField, Toggle} from '@mas.eg/mas-forms-fields-material-ui'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

export interface SettingsFormProps extends FormPropTypes {}
export class SettingsForm extends React.Component < SettingsFormProps,
any > {
    constructor() {
        super();
        this.state = {canSubmit: true ,
        arr:[
             {id:"الخطوط",value:{maxZoomL:"",minZoomL:"",featuresL:"",threadL:""}},
             {id:"المحابس",value:{maxZoomP:"",minZoomP:"",featuresP:"",threadP:""}},
             {id:"الحدود",value:{maxZoomPO:"",minZoomPO:"",featuresPO:"",threadPO:""}},
             {id:"المحطات",value:{maxZoomS:"",minZoomS:"",featuresS:"",threadS:""}}
            ]
            
         }
        this.validateForm = this .validateForm.bind(this);
        this.onChange = this .onChange .bind(this);
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
        console.log(modelmade);
        this.validateForm(modelmade);
        if (this.props.onChange) 
            this.props.onChange(modelmade, isChanged);
        return modelmade
    }
   
    render() {

        const validationErrors = this.state.validationErrors;
        const props = { onChange: this.onChange,
            validationErrors: this.state.validationErrors,
        }
        const formProps = {
            ...this.props,
            ...props
        };
        return (<div>
        <Form {...formProps} style={styles.form}>
            <h1 style={styles.h1}>Settings</h1>
            <div style={{}}>
            <TextField style={styles.textField1} required validations={{ isUrl: true}} name="server" floatingLabelText="server" hintText="الخادم"/>
            <TextField style={styles.textField1}  required validations={{ isInt: true}} name="port" floatingLabelText="port" hintText="رقم المنفذ"/>
            </div>
             <div> <TextField style={styles.textField1}  required name="namespace" floatingLabelText="namespace" hintText="المجموعة"/>
             <TextField style={styles.textField1}  required name="timeOut" floatingLabelText="TimeOut" hintText="TimeOut FloatingPanel"/></div> 

            <div style={{margin:'10px 0 10px 0'}}>
            <Table name="table" bodyStyle={{}} style={styles.table}>
                <TableHeader displaySelectAll={false} >
                <TableRow >
                    <TableHeaderColumn style={styles.tableHeader}>Name</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeader}>MaxZoom</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeader}>MinZoom</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeader}>No_Of_Features</TableHeaderColumn>
                    <TableHeaderColumn style={styles.tableHeader}>No_Of_Thread</TableHeaderColumn>

                </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                <TableRow>

                    <TableRowColumn style={styles.tableRow}> الخطوط</TableRowColumn>
                    <TableRowColumn  style={styles.tableRow}> <TextField style={styles.textField} name="maxZoomP" /></TableRowColumn>
                    <TableRowColumn  style={styles.tableRow}><TextField style={styles.textField} name="minZoomP" /></TableRowColumn>
                    <TableRowColumn  style={styles.tableRow}><TextField style={styles.textField} name="featuresP" /></TableRowColumn>
                    <TableRowColumn  style={styles.tableRow}><TextField style={styles.textField} name="threadP" /></TableRowColumn>
                </TableRow>
                <TableRow>

                    <TableRowColumn  style={styles.tableRow}> المحابس</TableRowColumn>
                    <TableRowColumn  style={styles.tableRow}><TextField style={styles.textField} name="maxZoomV" /></TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="minZoomV" /></TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="featuresV" /></TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="threadV" /></TableRowColumn>
                </TableRow>
                <TableRow>

                    <TableRowColumn style={styles.tableRow}>المحطات</TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="maxZoomS" /></TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="minZoomS" /></TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="featuresS" /></TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="threadS" /></TableRowColumn>
                </TableRow>
                <TableRow>

                    <TableRowColumn style={styles.tableRow}>الحدود</TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="maxZoomBo" /></TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="minZoomBo" /></TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="featuresBo" /></TableRowColumn>
                    <TableRowColumn style={styles.tableRow}><TextField style={styles.textField} name="threadBo" /></TableRowColumn>
                </TableRow>
                
                </TableBody>
            </Table></div>
            {/*<Toggle name="navigate"/>*/}
           
            <button style={styles.btn} type="submit" disabled={!this.state.canSubmit} onClick={}>Submit</button>
       
        </Form>
        
  </div>
        );
    }
}
var styles : React.CSSProperties = {
    textField1:{ 
        padding:5,
        marginRight:20
    },
    textField:{
        width:150,
  
    },
    form:{
        border: "1px solid",
        width: 800,
        margin: 'auto',
        padding: 25,
        marginTop: 20,
        backgroundColor: 'aliceblue',
        borderRadius:10
    },
    table:{
        width:"800px",
     },
    tableRow:{
        textAlign:'-webkit-left'
    },
    tableHeader:{
        color:'#6b6bef',
        fontSize:15
    },
    h1:{
        textAlign:'center',
         backgroundColor: '#7facd0',
        height: 47,
        padding: 5,
    },
    btn:{
        fontSize: 20,
        padding: 3,
        width: 90,
        borderRadius: 5,
        background: '#76a2c5',
        marginRight: 100,
        marginTop: 10
    }

}