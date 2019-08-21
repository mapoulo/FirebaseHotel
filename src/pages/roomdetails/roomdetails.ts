import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BookingPage } from '../booking/booking';
import { SnapShots } from '../../app/Environment';
import * as firebase from 'firebase';
// import { Room } from '../../app/Room'; 

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
  Price : number;
  roomType : string;
  image : string;
  description : string;
  KeyHotel : string;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', res => {
      this.MyArray = SnapShots(res);
   
    })
    this.description = this.navParams.get('description');
    this.Price = this.navParams.get('price');
    this.roomType = this.navParams.get('roomType');
    this.image = this.navParams.get('image');
    this.KeyHotel = this.navParams.get('HotelKey');

    console.log("Room details", this.KeyHotel);
    
  }

  ionViewDidLoad() {  
   
  }


  booknows(){
    console.log(+ this.Price);
    console.log(this.description);
  }

booknow(){
  this.navCtrl.push(BookingPage, {price: this.Price, KeyHotel:this.KeyHotel});
}
}
