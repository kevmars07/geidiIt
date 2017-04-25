import { Component } from '@angular/core';
import { AlertController, NavController, NavParams } from 'ionic-angular';

declare var require: any;
var loki = require('lokijs');

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  db: any;
  projects: any;
  loginUser: string;
  projectName: string;
  noOfRecords: string;

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
    this.loginUser = this.navParams.get("usernameData");

    this.db = new loki('project');
    this.projects = this.db.addCollection('projects');
  }

  addProject() {
    //validation here
    if (this.validate()) {
      this.projects.insert({ name: this.projectName });
      this.noOfRecords = "" + this.projects.data.length;
      this.projectName = "";
    }
    else {
      // this.getProjects().indexOf({name:this.projectName});
      let alert = this.alertCtrl.create({
        title: "Error",
        subTitle: "Project name must contain a value and must not exist in the list!",
        buttons: ['OK']
      });

      alert.present();
    }
  }

  validate(): boolean {
    
    if(this.projectName===''){
      return false;
    }
    else{
       return true;
    }
  }

  getProjects() {
    return this.convertToArray(this.projects.data);
  }

  convertToArray(val) {
    return Array.from(val);
  }

}
