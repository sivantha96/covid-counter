import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  Gender: string;
  gender: string[] = ['Male', 'Female'];

  constructor() { }

  ngOnInit(): void {
  }

}
