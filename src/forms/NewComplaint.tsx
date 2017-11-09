import * as React from 'react';
import * as models from '@mas.eg/mas-data-models/server'
var Webcam = require('react-webcam')

import { DropDownMenu, SelectField, TextField, Toggle } from '@mas.eg/mas-forms-fields-material-ui';
import { Field, Form, FormPropTypes } from '@mas.eg/mas-forms/src';

import MenuItem from 'material-ui/MenuItem';
var x;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var src, src2
declare let navigator: any;
declare let Camera: any;
<<<<<<< HEAD
declare let device: any;
let cordova;
=======

 let device;

>>>>>>> fadb995a6994ae074819fc5c78063051f5667df0
export interface NewComplaintFormProps extends FormPropTypes {
    busy?: boolean,
    error?: string,
    complaintTypes?: Array<models.ComplaintType>
    actionTypes?: Array<models.ComplaintType>
}
export class NewComplaintForm extends React.Component<NewComplaintFormProps,
    any> {
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

    componentDidMount() {
        document.addEventListener("deviceready", onDeviceReady, false);
        function onDeviceReady() {
        }
    }
    onPhotoDataSuccess(imageData) {
        var takePhoto = document.getElementById('takePhoto');
        takePhoto.style.backgroundColor = 'green';
        document.getElementById('takePhoto').
        setAttribute( 'src', "data:image/jpeg;base64," + imageData ); 
    }
    capturePhoto() {
        navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
            quality: 50,
            destinationType: Camera.DestinationType.DATA_URL,
            //sourceType: Camera.PictureSourceType.CAMERA,
            encodingType: Camera.EncodingType.PNG,
            allowEdit: true,
            targetWidth: 200, targetHeight: 200
        }
        );
    }
    // capturePhotoEdit() {
    //     navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
    //         quality: 20, allowEdit: true,
    //         destinationType: destinationType.DATA_URL
    //     });
    // }
    onPhotoURISuccess(imageURI) {
        alert(imageURI)
        var getPhoto = document.getElementById('getPhoto');
        getPhoto.style.background = 'red';
        document.getElementById('getPhoto').
        setAttribute( 'src', imageURI ); 
    }
    getPhoto() {
       navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50, 
         destinationType: Camera.DestinationType.FILE_URI,
         sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
         });
     }
    onFail(message) {
        alert('Failed because: ' + message);
    }
    validateForm(values) {
        if (!values.server) {
            this.setState({
                validationErrors: {
                    server: 'Has no value'
                }
            });
        } else {
            this.setState({ validationErrors: {} });
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
            validationErrors: this.state.validationErrors
        }
        const formProps = {
            ...this.props,
            ...props
        };
        let rendred = this.props.busy ? <div>saving....</div> :
            <Form {...formProps} style={styles.form}>
                <caption>ID:
                <TextField style={styles.textField1} name="ID" />
                </caption>
                {this.props.error && <div style={{ color: 'red', fontSize: 16 }}>{this.props.error.toString()}</div>}
                <div style={{}}>
                    <SelectField hintText="النوع" floatingLabelText="النوع"
                        style={styles.textField1}
                        required
                        validations={{
                            isUrl: true
                        }}
                        name="TYPE">
                        {this.props.complaintTypes && this.props.complaintTypes.map((itm, itr) => {
                            return <MenuItem value={itm.ID} primaryText={itm.DESCRIPTION} key={"mi" + itr} />
                        })}
                    </SelectField>

                    <TextField
                        style={styles.textField1}
                        required
                        validations={{
                            isInt: true
                        }}
                        name="DESCRIPTION"
                        floatingLabelText="الوصف"
                        hintText="الوصف" />
                    <TextField
                        style={styles.textField1}
                        required
                        validations={{
                            isInt: true
                        }}
                        name="ADDRESS"
                        floatingLabelText="العنوان"
                        hintText="العنوان" />
                    <SelectField hintText="الاجراء" floatingLabelText="الاجراء"
                        style={styles.textField1}
                        required
                        validations={{
                            isUrl: true
                        }}
                        name="ACTION">
                        {this.props.actionTypes && this.props.actionTypes.map((itm, itr) => {
                            return <MenuItem value={itm.ID} primaryText={itm.DESCRIPTION} key={"act_mi" + itr} />
                        })}
                    </SelectField>
                </div>
                <div>
                    <TextField style={styles.textField1} name="LAT" />
                    <TextField style={styles.textField1} name="LNG" />
                </div>

                <button style={styles.btn} type="submit" disabled={!this.state.canSubmit}>Submit</button>
                <button onClick={this.capturePhoto.bind(this)}>Capture Photo</button>
                <button onClick={this.getPhoto.bind(this)}>get Photo></button>

                <img style={{ display: 'block', border: '2px solid black', width: 250, height: 150 }} ref='getPhoto' id="getPhoto"   ></img>
                <img style={{ display: 'block', border: '2px solid black', width: 260, height: 150 }} ref="takePhoto" id="takePhoto"  />
            </Form>


        return rendred;





    }
}
var styles: React.CSSProperties = {
    textField1: {
        padding: 5,
        marginRight: 20
    },
    textField: {
        width: 150
    },
    form: {
        border: "1px solid",
        maxWidth: 800,
        margin: 'auto',
        padding: 25,
        marginTop: 20,
        backgroundColor: 'aliceblue',
        borderRadius: 10
    },
    table: {
        width: "800px"
    },
    tableRow: {
        textAlign: '-webkit-left'
    },
    tableHeader: {
        color: '#6b6bef',
        fontSize: 15
    },
    h1: {
        textAlign: 'center',
        backgroundColor: '#7facd0',
        height: 47,
        padding: 5
    },
    btn: {
        fontSize: 20,
        padding: 3,
        width: 90,
        borderRadius: 5,
        background: '#76a2c5',
        marginRight: 100,
        marginTop: 10
    }

}