import { Component, OnInit ,EventEmitter, Input} from '@angular/core';
import  {DataService} from '../data.service';
import { LoginComponent } from '../app-main/login/login.component';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  inputs:['response']
})
export class AppHeaderComponent implements OnInit {

    userName: String;

  constructor( private dataService : DataService) { }

  ngOnInit() {
             this.dataService.myMethod$.subscribe((data) => {
             this.userName = data; // And he have data here too!
             console.log(this.userName);
             if(this.userName){
                document.getElementById('nameLogin').innerHTML=this.userName+'  ברוכים הבאים ';
            }
            }
        );
      //this.userName =this.dataService.firstNameUser;
        console.log('the user is');
        console.log(this.userName);
  }



}
