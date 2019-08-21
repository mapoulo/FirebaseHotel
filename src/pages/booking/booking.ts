import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PaymentsPage } from '../payments/payments';
// import { SnapShots } from '../../app/Environment';
import * as firebase from 'firebase';
// import { ViewhotelPage } from '../viewhotel/viewhotel';
import * as moment from 'moment';



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

  Customer: any = {};
  HotelKey : string;
  CustomerKey: string;
  ref = firebase.database().ref('Customers/');  
  price : number;
  Room : number = 1;
  Guests: number = 1;
  today = moment().format('YYYY-MM-DD');
  CheckinDate : boolean;
  CheckOutDate : boolean;
  hotelKey : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alert:AlertController) {
    // <h1>{{ today | date: 'yyyy/MM/dd' }}</h1>
    this.hotelKey = this.navParams.get('KeyHotel');
  }

 

  onChange(selectedValue: any){
    console.log('Selected', selectedValue);
      this.price = this.price * selectedValue;
  }

  showDate1(){
    console.log('The customers CheckintDate ',this.Customer.CheckinDate);
    console.log('Todays date is ', this.today);
    if(this.Customer.CheckinDate < this.today){
      const alert =  this.alert.create({
        message: 'Please select the correct date.',
        buttons: ['OK']
      });
        alert.present();
    }else {
        this.CheckinDate = true;
    }
    console.log(this.CheckinDate);
  }

  showDate2(){
    console.log('The customers CheckOutDate ',this.Customer.CheckOutDate);
    console.log('Todays date is ', this.today);
    if( this.Customer.CheckOutDate <  this.Customer.CheckinDate ){
      const alert =  this.alert.create({
        message: 'Please select the correct date.',
        buttons: ['OK']
      });
        alert.present();
    }else if( this.Customer.CheckinDate === undefined){
      const alert =  this.alert.create({
        message: 'Please select the Checkin date first.',
        buttons: ['OK']
      });
        alert.present();
    }else if (this.Customer.CheckinDate === this.Customer.CheckOutDate){
      const alert =  this.alert.create({
        message: 'Checkin and Checkout cannot be on the same day.',
        buttons: ['OK']
      });
        alert.present();
    }else{
      this.CheckOutDate = true; 
      console.log("the checkout part");
    }
    console.log(this.CheckOutDate);
  }



  ionViewDidLoad() {
     this.price = this.navParams.get('price');
    console.log(this.price);
  }


  onSelectChange(selectedValue: any) {
    console.log('Selected', selectedValue);
  }


  payment(){
    if(this.Customer.CheckinDate == undefined || this.Customer.CheckOutDate == undefined){
      this.hotelKey = this.navParams.get('HotelKey');
      const alert =  this.alert.create({
        message: 'Please select the checkin and checkout dates.',
        buttons: ['OK']
      });
        alert.present();
    }else if(this.CheckOutDate && this.CheckinDate){
      this.navCtrl.push(PaymentsPage, {HotelKey: this.hotelKey});
    }else{
      const alert =  this.alert.create({
        message: 'Please select the correct dates.',
        buttons: ['OK']
      });
        alert.present();
    }
    
  }

}
