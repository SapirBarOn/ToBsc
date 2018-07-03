import { Component, OnInit } from '@angular/core';
import {CurrentUser} from '../../app-shared/current-user';
import { User } from '../../model/user.model';
import { DataService } from '../../data.service';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
user:User;
id:string;
age:number;
WorkExperience:string;
gender:string;
firstName:string;
lastName:string;

 
  constructor(private dataService : DataService,
              private currentUserService : CurrentUser) { }

  ngOnInit() {
       this.user=this.currentUserService.getCurrentUser();
        if(this.user!=undefined){
            console.log('11')
            this.id=this.user.getId();
            this.WorkExperience=this.user.getWorkExperience();
            this.gender=this.user.getGender();
            this.age=this.user.getAge();
            this.firstName=this.user.getFirstName();
            this.lastName=this.user.getLastName();
            console.log(this.age,this.WorkExperience,this.gender,this.id,this.firstName,this.lastName);
        }
        
    }
}
