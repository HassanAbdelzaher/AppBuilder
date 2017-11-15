import * as React from 'react';
var x;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var src,src2
declare let navigator: any;
declare let Camera: any;
declare let device: any;
let cordova;

export default class CameraMobile extends React.Component<{} , {screenshot:any}> {
    constructor(props){
        super(props);
        this.state = { screenshot: null }
    } 

componentDidMount(){
    
  } 

// convertImage(){
//     var imgElem = document.getElementById('takePhoto');
//     var imgData = JSON.stringify(this.getBase64Image(imgElem));
//     alert(imgData)
//     //   $.ajax({
//     //   url: 'http://url.com/rest/api',
//     //   dataType: 'json',
//     //   data: imgData,
//     //   type: 'POST',
//     //   success: function(data) {
//     //     console.log(data);
//     //     }
//     //   });
    
// }
    // getBase64Image(imgElem) {
    //    // imgElem must be on the same server otherwise a cross-origin error will be thrown "SECURITY_ERR: DOM Exception 18"
    //        var canvas = document.createElement("canvas");
    //        canvas.width = imgElem.clientWidth;
    //        canvas.height = imgElem.clientHeight;
    //        var ctx = canvas.getContext("2d");
    //        ctx.drawImage(imgElem, 0, 0);
    //        var dataURL = canvas.toDataURL("image/png");
    //        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    //    }
    onPhotoDataSuccess(imageData) { 
    var takePhoto = document.getElementById('takePhoto');
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
onPhotoURISuccess(imageURI) {
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
 
  render() {
    return (
     <div>   
     <button onClick={this.capturePhoto.bind(this)}>capturePhoto</button>
     <button onClick={this.getPhoto.bind(this)}>get Photo></button>
     <img style={{ display: 'block', border: '2px solid black', width: 250, height: 150 }} ref='getPhoto' id="getPhoto"   ></img>
     <img style={{ display: 'block', border: '2px solid black', width: 250, height: 150 }} ref="takePhoto" id="takePhoto"  ></img>
    </div>
    );
  }
}