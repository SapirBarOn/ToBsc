import { Component, OnInit } from '@angular/core';
import  {DataService} from '../../../data.service';
import { User } from '../../../model/user.model';
import { SubEngByUser } from '../../../model/SubEngByUser.model';
import { Logs } from '../../../model/Logs.model';
import * as Chart from 'chart.js';
import { CurrentQuestion } from '../../../app-shared/current-question';
import  {Question} from '../../../model/Qustion.model';

@Component({
  selector: 'app-expert-users',
  templateUrl: './expert-users.component.html',
  styleUrls: ['./expert-users.component.css']
})
export class ExpertUsersComponent implements OnInit {

    users:User[]=[];
    usersLenght:number;
 

  constructor(private dataService : DataService,
    private currentQuestionService:CurrentQuestion) { }

  ngOnInit() {
      this.dataService.allUsers((result) =>{
          this.users=result;
          console.log(this.users);
          console.log(this.users.length);
          this.usersLenght=this.users.length;
      })
      
    } 
 goBack() {
    window.history.back();
  }

}
