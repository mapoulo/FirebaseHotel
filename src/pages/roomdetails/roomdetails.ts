import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingPage } from '../booking/booking';
import { SnapShots } from '../../app/Environment';
import * as firebase from 'firebase';

/**
 * Generated class for the RoomdetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-roomdetails',
  templateUrl: 'roomdetails.html',
})
export class RoomdetailsPage {

  MyArray = [];
  ref = firebase.database().ref('rooms/');

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', res => {
      this.MyArray = SnapShots(res);
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoomdetailsPage');
  }
booknow(){
  this.navCtrl.push(BookingPage);
}
}
