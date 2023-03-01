import {Router} from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private route: Router) {}

  viewProducts(){
    this.route.navigate(['./products'])
  }
  
  addNewProduct(){
    this.route.navigate(['./add-products'])
  }
  
  closeSession(){
    localStorage && localStorage.removeItem('token')
    this.route.navigate(['./log-in'])
  }
}
