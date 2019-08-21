import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Users } from '../../app/user';
import { LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms'
import { RegistrationPage } from '../registration/registration';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  

  loginForm: FormGroup;
  
  users = {
    email: '',
    password: ''
  }

  
  validation_messages = {
    'email': [
      {type: 'required', message: 'Email address is required.'},
      {type: 'pattern', message: 'Email address is not Valid.'},
      {type: 'validEmail', message: 'Email address already exists in the system.'},
    ],
    'password': [
     {type: 'required', message: 'Password is required.'},
     {type: 'minlength', message: 'password must be atleast 6 char or more.'},
     {type: 'maxlength', message: 'Password must be less than 8 char or less'},
   ]
 
  }


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public forms: FormBuilder, public loading: LoadingController)  {
      this.loginForm = this.forms.group({

        email: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$')])),

        password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(10)]))
      })
  }

  onSubmit(){
    console.log("ng subit");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  Register(){
    this.navCtrl.push(RegistrationPage);
  }
  
//   login() {

//     if (this.user.email ===undefined && this.user.password===undefined)
//     {
//       let alertSuccess = this.alertCtrl.create({
//            title: '',
//            subTitle: 'Email and password cannot be empty',
//            buttons: ['Ok']
//           });
//           alertSuccess.present();
//     }else{

//       let loading = this.loadingCtrl.create({
//         content: 'Please wait...',
//         duration: 2000
//       })
    
//       loading.present();
    
  
//   firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then((result) => {
//     this.navCtrl.setRoot(HomePage);
//   }).catch((error) => {  
//   let errorCode = error.code;
//   let errorMessage = error.message;
  
//   this.alertCtrl.create({
//     title: errorCode,
//     subTitle: errorMessage,
//     buttons: ['Ok']
//   }).present();
//   });

//     }
//  }


login() {
  if(this.loginForm.valid) {
    let loaders = this.loading.create({
     
      content: 'Please wait...',
       duration: 2000
  });
  loaders.present();
  firebase.auth().signInWithEmailAndPassword(this.users.email, this.users.password).then(result => {    
      this.navCtrl.setRoot(HomePage);  
    }).catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      let errors = this.alertCtrl.create({
        title: errorCode,
        subTitle: errorMessage,
        buttons: ['Try Again']
      })
      errors.present();
      // ...
    });
  }else {
    let errors = this.alertCtrl.create({
      title: '',
      subTitle: 'Please fill in the empty space.',
      buttons: ['Ok']
    })
    errors.present();
  }
}

}
