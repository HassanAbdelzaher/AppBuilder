import * as React from 'react';
var x;
var pictureSource;   // picture source
var destinationType; // sets the format of returned value 
var src, src2
declare let navigator: any;
declare let Camera: any;
declare let device: any;
let cordova;

 var img:HTMLElement
 var getImage:HTMLElement

export function onFail(message) {
    alert('Failed because: ' + message);
}
export function onPhotoDataSuccess(imageData:any) {
   img = document.createElement("img");
    img.setAttribute('src', "data:image/jpeg;base64," + imageData); 
    return img
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
    alert("well")
    return img
}
export function onPhotoURISuccess(imageURI) {
    getImage = document.createElement("img");
    getImage.setAttribute('src', imageURI); 
    return getImage
}

export function getPhoto() {
    navigator.camera.getPicture(this.onPhotoURISuccess, this.onFail, { quality: 50, 
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
      });
      
      return getImage 
  }