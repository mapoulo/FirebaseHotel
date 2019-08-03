import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase';
import { SnapShots } from '../../app/Environment'; 
import { BookingPage } from '../booking/booking';


/**
 * Generated class for the ViewhotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viewhotel',
  templateUrl: 'viewhotel.html',
})
export class ViewhotelPage {

  array = [];
  ref = firebase.database().ref('Hotels/');


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.ref.on('value', res => {
      this.array = SnapShots(res);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewhotelPage');
  }

  book(){
    this.navCtrl.push(BookingPage);
  }

  Delete(key){
    firebase.database().ref('Hotels/'+key).remove();
  }

}
