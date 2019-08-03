import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegistrationPage } from '../pages/registration/registration';
import { AddhotelPage } from '../pages/addhotel/addhotel';
import { ViewhotelPage } from '../pages/viewhotel/viewhotel';
import { BookingPage } from '../pages/booking/booking';
import { PaymentsPage } from '../pages/payments/payments';
import { ProfilePage } from '../pages/profile/profile';
import { RoomdetailsPage } from '../pages/roomdetails/roomdetails';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    AddhotelPage,
    ViewhotelPage,
    BookingPage,
    PaymentsPage,
    ProfilePage,
    RoomdetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
   
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegistrationPage,
    AddhotelPage,
    ViewhotelPage,
    BookingPage,
    PaymentsPage,
    ProfilePage,
    RoomdetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
