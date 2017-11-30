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
  
export function captureImage(callback) {
    //change to camera for mock and working in browser
    navigator.camera.getPicture((mediaFiles)=>{
        console.dir({mediaFiles});
        if(callback){
          /*var i, len,path
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath||mediaFiles[i];
            }*/
          callback(mediaFiles);
        }
    }, (error)=>{
      var msg = 'An error occurred during capture: ' + error.code;
      navigator.notification.alert(msg, null, 'Uh oh!');
    }, {limit: 1});
  }

export function captureAudio(callback) {
  navigator.device.capture.captureAudio((mediaFiles)=>{
      if(callback){
        var i, len,path
        for (i = 0, len = mediaFiles.length; i < len; i += 1) {
            path = mediaFiles[i].fullPath||mediaFiles[i];
        } 
        callback(path);
      }
  }, (error)=>{
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
  }, {limit: 1});
}

  export function captureVideo(callback) {
     navigator.device.capture.captureVideo((mediaFiles)=>{
        if(callback){
          var i, len,path
          for (i = 0, len = mediaFiles.length; i < len; i += 1) {
              path = mediaFiles[i].fullPath;
          } 
          callback(path);
        }
    }, (error)=>{
      var msg = 'An error occurred during capture: ' + error.code;
      navigator.notification.alert(msg, null, 'Uh oh!');
    }, {limit: 1});
  }
export function captureAudioSuccess(mediaFiles) {
    var i, len,path
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[0].fullPath;
    } 
}

export function playMP3() {
    media.play();
}
 

