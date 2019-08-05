import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewhotelPage } from '../viewhotel/viewhotel';
import { AddhotelPage } from '../addhotel/addhotel';
import { BookingPage } from '../booking/booking';
import { ProfilePage } from '../profile/profile';
import { RoomdetailsPage } from '../roomdetails/roomdetails';
import { SnapShots } from '../../app/Environment';
import * as firebase from 'firebase';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  MyArray = [];
  ref = firebase.database().ref('rooms/');

  constructor(public navCtrl: NavController) {
   this.ref.on('value', res => {
     this.MyArray = SnapShots(res);
   })
  }

  profile(){
    this.navCtrl.push(ProfilePage);
  }

  viewHotel(){
    this.navCtrl.push(ViewhotelPage);
  }

  book(){
    this.navCtrl.push(BookingPage);
  }
rooms(){
  this.navCtrl.push(RoomdetailsPage)
}
}
