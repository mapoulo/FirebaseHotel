import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
// import { SnapShots } from '../../app/Environment';
// import * as firebase from 'firebase';
import { HomePage } from '../home/home';
import * as firebase from 'firebase';
import { SnapShots } from '../../app/Environment';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { LoadingController } from 'ionic-angular';

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


  loginForm: FormGroup;
  
  users = {
    name: '',
    card: '',
    date: '',
    ccv: '',
   
  }

  validation_messages = {
    'name': [
      {type: 'required', message: 'Please enter your name.'},
      {type: 'minlength', message: 'Must be atleast 6 char or more.'},
    {type: 'maxlength', message: 'Must be less than 8 char or less'},
    ],
    'card': [
     {type: 'required', message: 'Please enter your card number.'},
     {type: 'minlength', message: 'Must be 16 digits.'},
     {type: 'maxlength', message: 'Must be 16 digits.'},
   ],

   'date': [
    {type: 'required', message: 'Please enter your date.'},
    {type: 'minlength', message: 'MM/DD/YY'},
    {type: 'maxlength', message: 'MM/DD/YY'},
  ],

  
  'ccv': [
    {type: 'required', message: 'Please enter your ccv.'},
    {type: 'minlength', message: 'Must be 3 digits.'},
    {type: 'maxlength', message: 'Must be 3 digits.'},
  ]

 
  }

  




  
  name : string;
  card : string;
  date : string;
  ccv : string;
  HotelKey : string;
  UserId : string;
  ref  = firebase.database().ref('Profiles/');
  // Hotel_key : string;
  // customer_key : string;
  // details = {};
  // item = {};
  // ref = firebase.database().ref('Customers/');  

  constructor(public navCtrl: NavController, public navParams: NavParams, public loading: LoadingController, public alertCtrl: AlertController,public forms: FormBuilder) {



    
    // firebase.auth().onAuthStateChanged((user) => {
    //   if(user) {
    //     this.UserId = user.uid;
    //     this.ref.orderByChild('userUid').equalTo(user.uid).on('value', (snap) => {
    //        this.user  = SnapShots(snap);
    //     });
 
    //   }
    // })

    this.HotelKey = this.navParams.get('HotelKey');
    console.log("The hotel key from the payment page is", this.HotelKey);


    
    this.loginForm = this.forms.group({
      name: new FormControl('', Validators.compose([Validators.required])),
      card: new FormControl('', Validators.compose([Validators.required, Validators.minLength(16), Validators.maxLength(16)])),
      date: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6)])),
      ccv: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(3)]))
    })
  
    
  }

  ionViewDidLoad() {
    // this.details = this.navParams.get('details');
    // this.customer_key = this.navParams.get('CustomerKey');
    // let NewItem = this.ref.push();
    // NewItem.set(this.details);
    // console.log(this.details);
 
  }

  

  home(){
    console.log(this.loginForm.valid);
    
    if(this.loginForm.valid){
      this.HotelKey = this.navParams.get('HotelKey');
      console.log("the hotel key is:", this.HotelKey)
      // firebase.database().ref('Profiles/'+ this.HotelKey).set({
      //     HotelKey : this.HotelKey  
      // });

      let alertSuccess = this.alertCtrl.create({
        title: '',
        subTitle: 'You have successfully booked a hotel',
        buttons: ['Ok']
    });

    // firebase.auth().onAuthStateChanged((user) => {
    //   if(user.uid) {
    //     // this.ref.orderByChild('userUid').equalTo(user.uid).on('value', (snap) => {
    //     //    this.user  = SnapShots(snap);
    //     // });
    //  this.ref.set({
    //    HotelKey : this.HotelKey
    //  })
    //   }
    // })

    this.navCtrl.push(HomePage);
    alertSuccess.present();

     
    }else{
      let alertSuccess = this.alertCtrl.create({
        title: '',
        subTitle: 'Please fill in the empty space',
        buttons: ['Ok']
    });
    alertSuccess.present();
    }
    
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
