import * as React from 'react';
var x;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var src, src2
declare let navigator: any;
declare let Camera: any;
declare let device: any;
declare let FileUploadOptions:any;
declare let FileTransfer:any;
let cordova;
let media;
 var img
 var getImage

export function onFail(message) {
    alert('Failed because: ' + message);
}
export function onPhotoDataSuccess(imageData:any) {
   img = document.createElement("img");
    img.setAttribute('src', "data:image/jpeg;base64," + imageData); 
}
export function capturePhoto() {
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
export function win(r) {
    console.log("Code = " + r.responseCode);
    console.log("Response = " + r.response);
    console.log("Sent = " + r.bytesSent);
}
export function fail(error) {
    alert("An error has occurred: Code = " + error.code);
    console.log("upload error source " + error.source);
    console.log("upload error target " + error.target);
}
export function onPhotoURISuccess(imageURI) {

    getImage = document.createElement("img");
    getImage.setAttribute('src', imageURI); 

    var options = new FileUploadOptions();
    options.fileKey="file";
    options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1)+'.png';
    options.mimeType="text/plain";
    var params = new Object();
    options.params = params;
    var ft = new FileTransfer();
   ft.upload(imageURI, encodeURI("http://41.98.109.17/images"), win, fail, options);

}
export function getPhoto() {
    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50, 
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
      });  
  }
  
  export function captureAudio() {
    // Launch device record application, 
    navigator.device.capture.captureAudio(this.captureSuccess, this.captureError, {limit: 2});
}
  export function captureSuccess(mediaFiles) {
    var i, len;
    var path
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
         
        this.uploadFile(mediaFiles[i]);
    } 
    console.log("Success");
    var a="<audio controls>"
    	a += "<source src='" + mediaFiles[0].fullPath + "' type='video/mp4'>";
    a += "</audio>";
    document.querySelector("#audioArea").innerHTML = a;
}
function uploadFile(mediaFile) {
    var ft = new FileTransfer(),
        path = mediaFile.fullPath,
        name = mediaFile.name;

    ft.upload(path,
        "http://my.domain.com/upload.php",
        function(result) {
            console.log('Upload success: ' + result.responseCode);
            console.log(result.bytesSent + ' bytes sent');
        },
        function(error) {
            console.log('Error uploading file ' + path + ': ' + error.code);
        },
        { fileName: name });   
}

function playMP3() {
    media.play();
}
// Called if something bad happens.
// 
export function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}
