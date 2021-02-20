import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.css']
})
export class MasterPageComponent implements OnInit {
  
  row_frame: object[] = [
    {a1:4, b1:6},
    {a2:11},
    {a3:2, b3:3, c3:3, d3:3}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
