import { Component, OnInit ,DoCheck,EventEmitter, Input ,Output} from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../model/user.model';
import { CurrentUser } from '../app-shared/current-user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css'],
  inputs:['response']
})
export class AppHeaderComponent implements OnInit{

  user:User;

  constructor( private dataService:DataService,
               private router:Router ,
               private currentUserService:CurrentUser ) {}

  ngOnInit() {
    this.dataService.myMethod$.subscribe((data) => {
      this.user = data; 
    });
  }


  logOut(){
    this.currentUserService.change(null);
    this.user=null;
    this.router.navigateByUrl('/aboutUs');
  }

}
