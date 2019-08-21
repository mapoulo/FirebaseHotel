import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ViewhotelPage } from '../viewhotel/viewhotel';
// import { AddhotelPage } from '../addhotel/addhotel';
import { BookingPage } from '../booking/booking';
import { ProfilePage } from '../profile/profile';
import { RoomdetailsPage } from '../roomdetails/roomdetails';
import { SnapShots } from '../../app/Environment';
import * as firebase from 'firebase';
import { Profile2Page } from '../profile2/profile2';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  picture : string;
  user = [];
  userEmail : string;
  ref2 = firebase.database().ref('Profiles/');

  MyArray = [];
  ref = firebase.database().ref('rooms/');

  constructor(public navCtrl: NavController) {
   this.ref.on('value', res => {
     this.MyArray = SnapShots(res);
   })

   firebase.auth().onAuthStateChanged((user) => {
    if(user) {
      this.ref2.orderByChild('userUid').equalTo(user.uid).on('value', (snap) => {
        console.log("the user uid is :", user.uid);
         this.user  = SnapShots(snap);
         console.log(this.user);
         
      });

    }
  })
  }

  profile(){
    
    // this.navCtrl.push(Profile2Page);
    this.navCtrl.push(ProfilePage);
  }

  viewHotel(){
    this.navCtrl.push(ViewhotelPage);
  }

  book(){
    this.navCtrl.push(BookingPage);
  }

  

  rooms(obj){
    console.log("Home page "+obj.HotelKey)
    this.navCtrl.push(RoomdetailsPage, {price: obj.price,  roomType:obj.roomType, description:obj.description, image:obj.image, HotelKey:obj.HotelKey} );
 }

}
