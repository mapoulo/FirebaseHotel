import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewhotelPage } from '../viewhotel/viewhotel';
import { AddhotelPage } from '../addhotel/addhotel';
import { BookingPage } from '../booking/booking';
import { ProfilePage } from '../profile/profile';
import { RoomdetailsPage } from '../roomdetails/roomdetails';





@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  M = [
    {name: 'Nkwe'},
    {name: 'Nkwe'},
    {name: 'Nkwe'},
    {name: 'Nkwe'},
    {name: 'Nkwe'},
    {name: 'Nkwe'},
    {name: 'Nkwe'},
    {name: 'Nkwe'},
    {name: 'Nkwe'},
  ];

  constructor(public navCtrl: NavController) {

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
