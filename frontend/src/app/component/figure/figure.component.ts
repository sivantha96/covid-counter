import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-figure',
  templateUrl: './figure.component.html',
  styleUrls: ['./figure.component.css']
})
export class FigureComponent implements OnInit {
  showMan:boolean = true
  constructor() { }

  ngOnInit(): void {
  }
}
