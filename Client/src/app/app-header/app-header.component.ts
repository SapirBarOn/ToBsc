import { Component, OnInit ,EventEmitter, Input} from '@angular/core';
import  {DataService} from '../data.service';
import { LoginComponent } from '../app-main/login/login.component';
// import { User } from '../model/user.model';
// import {CurrentUser} from '../app-shared/current-user';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  inputs:['response']
})
export class AppHeaderComponent implements OnInit {

    public userData: string;
    userName:string;
    // user:User;

  constructor( private dataService : DataService ) { }

  ngOnInit() {
             this.dataService.myMethod$.subscribe((data) => {
             this.userData = data; 
             console.log(this.userData);
             this.userName=this.userData[1];
             console.log(this.userName);
            }
        );

  }

  logOut(){
    this.userName=null;
  }

}
