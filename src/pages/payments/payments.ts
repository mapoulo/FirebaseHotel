import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SnapShots } from '../../app/Environment';
import * as firebase from 'firebase';

/**
 * Generated class for the PaymentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-payments',
  templateUrl: 'payments.html',
})
export class PaymentsPage {

  // Hotel_key : string;
  // customer_key : string;
  // details = {};
  // item = {};
  // ref = firebase.database().ref('Customers/');  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.ref.on('value', res => {
    //   SnapShots(res);
    // })
  }

  ionViewDidLoad() {
    // this.details = this.navParams.get('details');
    // this.customer_key = this.navParams.get('CustomerKey');
    // let NewItem = this.ref.push();
    // NewItem.set(this.details);
    // console.log(this.details);
 
  }

  con(){
    
  }
  

  // Save(obj){
  //  if(obj !== null && obj !== undefined){
  //    firebase.database().ref('Customers/'+this.customer_key).update({})
  //  }
  // }

  // savv(item){
  //   if(item.paymentMethod !== null && item.paymentMethod !== undefined){
  //     firebase.database().ref('Customers/'+this.customer_key).update({email:item.paymentMethod});
  //   }
    
  // }

}
