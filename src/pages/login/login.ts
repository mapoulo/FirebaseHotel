import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { Users } from '../../app/user';
import { LoadingController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import {FormBuilder,  FormGroup, Validators, AbstractControl} from '@angular/forms'
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
  user = {} as Users;

 formgroup:FormGroup;
 email:AbstractControl;
 password:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, public formBuilder: FormBuilder)  {

      this.formgroup =formBuilder.group({
        email:['',Validators.required],
        password:['',Validators.required]
      });
      this.email =this.formgroup.controls['email'];
      this.password =this.formgroup.controls['password'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  Register(){
    this.navCtrl.push(RegistrationPage);
  }
  
  login() {
    this.navCtrl.push(HomePage);
  //   if (this.user.email ===undefined && this.user.password===undefined)
  //   {
  //     let alertSuccess = this.alertCtrl.create({
  //          title: '',
  //          subTitle: 'email and password cannot be empty',
  //          buttons: ['Ok']
  //         });
  //         alertSuccess.present();
  //   }else{

  //     let loading = this.loadingCtrl.create({
  //       content: 'Please wait...',
  //       duration: 2000
  //     })
    
  //     loading.present();
    
  //   let alertSuccess = this.alertCtrl.create({
  //    title: 'Login',
  //    subTitle: 'You have Successfully LoggedIn',
  //    buttons: ['Ok']
  //   })
  
  // firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password).then((result) => {
  //   alertSuccess.present();
  //   this.navCtrl.setRoot(HomePage);
  // }).catch((error) => {  
  // let errorCode = error.code;
  // let errorMessage = error.message;
  
  // this.alertCtrl.create({
  //   title: errorCode,
  //   subTitle: errorMessage,
  //   buttons: ['Ok']
  // }).present();
  // });

  //   }


}
}
