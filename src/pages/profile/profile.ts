import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddhotelPage } from '../addhotel/addhotel';
import * as firebase from 'firebase';
import { SnapShots } from '../../app/Environment';
// import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';




/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  picture : string;
  user = [];
  userEmail : string;
  ref  = firebase.database().ref('Profiles/');

  array = [];
  ref2 = firebase.database().ref('BokinDetails/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.picture = this.navParams.get('pic');
    // this.ref.on('value', res => {
    //   this.user = SnapShots(res);
    // })
    console.log("email in the profile is", this.userEmail);

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.ref.orderByChild('userUid').equalTo(user.uid).on('value', (snap) => {
          console.log("the user uid is :", user.uid);
           this.user  = SnapShots(snap);
        });
 
      }
    })
    

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  EditProfile(key){
    this.navCtrl.push(AddhotelPage, {key: key});
  }

logout(){
  firebase.auth().signOut();
  this.navCtrl.push(LoginPage);
}


}
