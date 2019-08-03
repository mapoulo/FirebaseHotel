import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PaymentsPage } from '../payments/payments';
import { SnapShots } from '../../app/Environment';
import * as firebase from 'firebase';
import { ViewhotelPage } from '../viewhotel/viewhotel';



/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  // details = {};
  // HotelKey : string;
  // CustomerKey: string;
  // ref = firebase.database().ref('Customers/');  

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert:AlertController) {
    // this.HotelKey = this.navParams.get('key');
    // this.ref.on('value', res => {
    //   SnapShots(res);
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }


  payment(){
    this.navCtrl.push(PaymentsPage);
  }
}
