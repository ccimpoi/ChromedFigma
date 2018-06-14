import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  token: string;

  constructor() { }

  ngOnInit() {
    this.token = localStorage.getItem('token');
  }

  updateToken(){
    localStorage.setItem('token', this.token);
  }

}
