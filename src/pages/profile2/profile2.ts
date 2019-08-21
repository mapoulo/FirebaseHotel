import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { SnapShots } from '../../app/Environment';
import { LoginPage } from '../login/login';
import { AddhotelPage } from '../addhotel/addhotel';

/**
 * Generated class for the Profile2Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile2',
  templateUrl: 'profile2.html',
})
export class Profile2Page {


  picture : string;
  user = [];
  userEmail : string;
  ref  = firebase.database().ref('Profiles/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
console.log('The profile in the profile2');

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.userEmail = user.email;
        console.log("email in the profile is", this.userEmail);
        this.ref.orderByChild('userUid').equalTo(user.uid).on('value', (snap) => {
           this.user  = SnapShots(snap);
        });
 
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile2Page');
  }

  
  EditProfile(key){
    this.navCtrl.push(AddhotelPage, {key: key});
  }

logout(){
  firebase.auth().signOut();
  this.navCtrl.push(LoginPage);
}


}
