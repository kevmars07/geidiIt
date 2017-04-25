import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HomePage } from '../home/home';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  alertTitle: string;
  alertBody: string;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.required]
    });
  }

  logForm() {
    if (this.validate()) {
      let usernameValue = this.loginForm.controls['username'].value;
      let passwordValue = this.loginForm.controls['password'].value;
      //static only
      if (usernameValue === 'kevin' && passwordValue == 'bate') {
        this.navCtrl.setRoot(HomePage, { usernameData: usernameValue });
      }
      else {
        this.alertTitle = "Error";
        this.alertBody = "User does not exist/Invalid password!";

        let alert = this.alertCtrl.create({
          title: this.alertTitle,
          subTitle: this.alertBody,
          buttons: ['OK']
        });

        alert.present();
      }
    }
    else {
      this.alertTitle = "Validation Error";
      this.alertBody = "Please enter correct username and or password!";

      let alert = this.alertCtrl.create({
        title: this.alertTitle,
        subTitle: this.alertBody,
        buttons: ['OK']
      });

      alert.present();
    }
  }

  validate(): boolean {
    if (this.loginForm.valid) {
      return true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

}
