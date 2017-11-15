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
  
export async function captureAudio(callback) {
  await navigator.device.capture.captureAudio(this.captureAudioSuccess, this.captureError, {limit: 1});
}
export async function captureImage(callback) {
    await navigator.device.capture.captureImage(this.captureImageSuccess, this.captureError, {limit: 1});
  }
  export async function captureVideo(callback) {
    await navigator.device.capture.captureVideo(this.captureVideoSuccess, this.captureError, {limit: 1});
  }
 
export function captureAudioSuccess(mediaFiles) {
    var i, len,path
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[0].fullPath;
    } 
}
export function captureVideoSuccess(mediaFiles) {
    var i, len,path;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path= mediaFiles[i].fullPath
        return path
    }   
}
export function captureImageSuccess(mediaFiles) {
    var i, len,path
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
        path = mediaFiles[i].fullPath;
        //this.uploadFile(mediaFiles[i]);
    } 
}
export function captureError(error) {
    var msg = 'An error occurred during capture: ' + error.code;
    navigator.notification.alert(msg, null, 'Uh oh!');
}
export function playMP3() {
    media.play();
}
 

