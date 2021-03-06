import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SnapShots } from '../../app/Environment';
// import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';


/**
 * Generated class for the AddhotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addhotel',
  templateUrl: 'addhotel.html',
})
export class AddhotelPage {

  hotelData:any = {};
  user = [];
  ref  = firebase.database().ref('Profiles/');
  picture: string;
  Picture_url: string;
  key : string;
  name : string;
  Contact : string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController, private camera: Camera) {
    this.key = this.navParams.get('key');

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.ref.orderByChild('userUid').equalTo(user.uid).on('value', (snap) => {
           this.user  = SnapShots(snap);
        });
 
      }
    })

  
    
  }



  ionViewDidLoad() {
    // this.user = {};
    // this.ref.on('value', res => {
    //   this.user = SnapShots(res);
    // })
    // console.log('ionViewDidLoad AddhotelPage');
    console.log('Image url '+this.Picture_url);
  }

  profile(){
    if(this.name !== undefined && this.Contact !== undefined){
      firebase.database().ref('Profiles/'+ this.key).update({Username:this.name, Contact:this.Contact});
      let alert = this.alertCtrl.create({
        title: '', 
        subTitle: 'Profile edited',
        buttons: ['Ok']
      });
      alert.present();
      this.navCtrl.push(HomePage);
    }else{
      this.navCtrl.push(HomePage);
    }
   
  }

  
takePhoto(sourcetype: number) {
  const options: CameraOptions = {
    quality: 50,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    sourceType: sourcetype,
    mediaType: this.camera.MediaType.PICTURE,
    correctOrientation: true,
    targetHeight: 500,
    targetWidth: 500
  }
  
  this.camera.getPicture(options).then((picture) => {
   // imageData is either a base64 encoded string or a file URI
   // If it's base64 (DATA_URL):
   this.picture = 'data:image/jpeg;base64,' + picture;
  }, (err) => {
   // Handle error
  });


  
  let storageRef = firebase.storage().ref();
  const filename = Math.floor(Date.now() / 1000);
  let file = 'my-hotel/'+filename+'.jpg';
  const imageRef = storageRef.child(file);
  imageRef.putString(this.picture, firebase.storage.StringFormat.DATA_URL)
  .then((snapshot) => {
    console.log('image uploaded');
    this.Picture_url = snapshot.downloadURL;
    let alert = this.alertCtrl.create({
      title: 'Image Upload', 
      subTitle: 'Image Uploaded to firebase',
      buttons: ['Ok']
    });
    alert.present();
  })
}






// addHotelDetails(){
//   if(this.Picture_url != ""  && this.hotelData!==null && this.hotelData!==undefined){
//     let Hotel = this.ref.push();
//       Hotel.set({
//       HotelName : this.hotelData.name,
//       HotelLocation: this.hotelData.location,
//       HotelDescription: this.hotelData.description,
//       HotelImage: this.hotelData.this.Picture_url
//     })
//   }
// }

addHotelDetails(){
  if( this.Picture_url != ""  && this.hotelData!==null && this.hotelData!==undefined){
    let item = this.ref.push();
    item.set({
            HotelName : this.hotelData.name,
            HotelLocation: this.hotelData.location,
            HotelDescription: this.hotelData.description,
            HotelRoomPrice: this.hotelData.price,
            HotelImage: this.picture
    });
    let alert = this.alertCtrl.create({
      title: '', 
      subTitle: 'Successfully added',
      buttons: ['Ok']
    });
    alert.present();

  }else{
    let alert = this.alertCtrl.create({
      title: '', 
      subTitle: 'Fields cannot be empty',
      buttons: ['Ok']
    });
    alert.present();
  }
}

}
