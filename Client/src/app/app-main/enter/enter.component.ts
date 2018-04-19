import { Component, OnInit } from '@angular/core';
import  { DataService } from '../../data.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {
crowler:string;
  constructor(private newService : DataService) { }

  ngOnInit() {
      this.newService.getCrowler((data) =>{
        this.crowler=data;
        console.log(this.crowler);      

    });
  }

}
