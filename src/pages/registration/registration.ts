import { Component } from '@angular/core';
import { Users } from '../../app/user';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import * as firebase from 'firebase';
// import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { SnapShots } from '../../app/Environment';
import { Camera, CameraOptions } from '@ionic-native/camera';
/**
 * Generated class for the RegistrationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class RegistrationPage {


  loginForm: FormGroup;
  
  users = {
    email: '',
    password: '',
    Name: '',
    Mobile: '',
    Image : '',
    Picture_url : '',
    Bio : '',
    uid : ''
  }

  
  database: any;


  validation_messages = {
    'email': [
      {type: 'required', message: 'Please enter your email.'},
      {type: 'pattern', message: 'Email address is not valid.'},
      {type: 'validEmail', message: 'Email address already exists in the system.'},
    ],
    'password': [
     {type: 'required', message: 'Please enter your password.'},
     {type: 'minlength', message: 'password must be atleast 6 char or more.'},
     {type: 'maxlength', message: 'Password must be less than 8 char or less'},
   ],

   'Name': [
    {type: 'required', message: 'Please enter your name.'},
    {type: 'minlength', message: 'Must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'Must be less than 8 char or less'},
  ],


  
  'Mobile': [
    {type: 'required', message: 'Please enter your mobile numbers.'},
    {type: 'minlength', message: 'Must be 10 digits.'},
    {type: 'maxlength', message: 'Must be 10 digits.'},
  ]

 
  }

  
ref = firebase.database().ref('Users/');
ref2 = firebase.database().ref('Profiles/');

 

  constructor(
    private camera: Camera,
    public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public forms: FormBuilder, public loading: LoadingController
    ) {
    // this.ref.on('value', res => {
    //   SnapShots(res);
    // })


    this.loginForm = this.forms.group({
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),

      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)])),
      Name: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])),
      Mobile: new FormControl('', Validators.compose([Validators.required, Validators.minLength(1), Validators.maxLength(10)]))
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

//   createRegister() {
//     if (this.user.email ===undefined && this.user.password===undefined && this.user.Name===undefined && this.user.Mobile===undefined)
//     {
//       let alertSuccess = this.alertCtrl.create({
//            title: '',
//            subTitle: 'Email and password cannot be empty',
//            buttons: ['Ok']
//           });
//           alertSuccess.present();
//         }else{
//          let Person = this.ref.push();
//          Person.set(this.user); 
//          let loading = this.loadingCtrl.create({
//          content: 'Please wait...',
//          duration: 2000
//     })
//     loading.present();
  
//     firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password).then((result) => {
    
//       this.navCtrl.push(HomePage);
//     }).catch(function(error) {
   
//     });
//  this.navCtrl.push(HomePage);
//   }
  
// }


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
   this.users.Image = 'data:image/jpeg;base64,' + picture;
  }, (err) => {
   // Handle error
  });

  let storageRef = firebase.storage().ref();
  const filename = Math.floor(Date.now() / 1000);
  let file = 'my-hotel/'+filename+'.jpg';
  const imageRef = storageRef.child(file);
  imageRef.putString(this.users.Image, firebase.storage.StringFormat.DATA_URL)
  .then((snapshot) => {
    console.log('image uploaded');
    this.users.Picture_url = snapshot.downloadURL;
    let alert = this.alertCtrl.create({
      title: 'Image Upload', 
      subTitle: 'Image Uploaded to firebase',
      buttons: ['Ok']
    });
    alert.present();
  })
}




SaveProfile(key){
 console.log("The user key is", key);
  let loaders = this.loadingCtrl.create({
    content: 'Uploading, Please wait...',
    duration: 300
  });
 if(this.loginForm.valid) {
  loaders.present();
    // this.upload();
    firebase.auth().createUserWithEmailAndPassword(this.users.email, this.users.password).then((result) => {
      this.users.uid = result.user.uid;
      this.ref2.push({
        Image: this.users.Image,
        Contact: this.users.Mobile,
        Username: this.users.Name,
        Email : this.users.email,
        Bio: this.users.Bio,
        userUid: this.users.uid,
        timestamp: Date(),
       })
    
       
      this.navCtrl.setRoot(HomePage);
    }).catch(function(error) {
      console.log("The error is ", error);
      
    });
    // const ref = this.database.child('profile').push();
    console.log('the user uid: ',this.users.uid);
    
  }else {
    let alert = this.alertCtrl.create({
      title: '',
      subTitle: 'Please fill in all the empty space.',
      buttons: ['Ok']
    })
    alert.present();
  }
}



// SaveProfile(users: Users){
//   let loaders = this.loadingCtrl.create({
//     content: 'Uploading, Please wait...',
//     duration: 300
//   });
//  if(this.profileFormValidation.valid) {
//   loaders.present();
//     this.upload();
//     const ref = this.database.child('profile').push();
//     ref.set({
//       Image: users.image,
//       Contact: users.contact,
//       Username: users.username,
//       Bio: users.bio,
//       userUid: users.uid,
//       timestamp: Date(),
//      })
//     this.navCtrl.setRoot(HomePage);
//   }else {
//     let alert = this.alertCtrl.create({
//       title: 'error detected.',
//       subTitle: 'Your Inputs can\'t be empty',
//       buttons: ['Try again']
//     })
//     alert.present();
//   }
// }

}
