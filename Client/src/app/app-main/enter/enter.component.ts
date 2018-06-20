import { Component, OnInit } from '@angular/core';
import {CurrentUser} from '../../app-shared/current-user';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import  { DataService } from '../../data.service';
import { Subject } from '../../model/subject.model';
import {SubEngByUser} from'../../model/SubEngByUser.model';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.css']
})
export class EnterComponent implements OnInit {
allUsers:User[]=[];
samesUsers:User[]=[];
user:User;
sameUser:User;
id:string;
age:number;
WorkExperience:string;
gender:string;
subEngForUser:SubEngByUser[]=[];
totalSubEng:Subject[]=[];
threeSubEngRecommended:string[]=[];
  constructor(private dataService : DataService,private currentUserService : CurrentUser) { }

  ngOnInit() {
        // this.id='5ac35e2ee92c8230100e21c4' //    Testing Only
        // this.age=25
        // this.WorkExperience='שירות/תמיכת לקוחות'
        // this.gender='נקבה'
        this.user=this.currentUserService.getCurrentUser();
        this.id=this.user.getId();
        this.WorkExperience=this.user.getWorkExperience();
        this.gender=this.user.getGender();
        this.age=this.user.getAge();
        console.log(this.age,this.WorkExperience,this.gender)
         this.dataService.allUsers((result)=>{
            this.allUsers=result;
            console.log(result.length)
          for(let u=0; u<this.allUsers.length; u++){
                  this.allUsers[u].similarity=1;
                if(this.WorkExperience==this.allUsers[u].WorkExperience){
                    //this.samesUsers.push(this.allUsers[u])
                    this.allUsers[u].similarity++;
                 }

                if (this.gender==this.allUsers[u].gender){
                    // this.samesUsers.push(this.allUsers[u])
                    this.allUsers[u].similarity++;
                 }

                if (this.age==this.allUsers[u].age || this.age+1==this.allUsers[u].age || this.age-1==this.allUsers[u].age){
                     //this.samesUsers.push(this.allUsers[u])
                    this.allUsers[u].similarity++;
                }
            }

           console.log(this.allUsers)
           this.allUsers.sort(function(a, b){return b.similarity - a.similarity})

           if (this.allUsers[0].firstName != this.user.firstName){
               this.sameUser=this.allUsers[0]
               console.log(this.allUsers[0])              
           }
           else {
             this.sameUser=this.allUsers[1];
             console.log(this.sameUser);
           }
        this.dataService.getSubEngByUserId(this.sameUser._id , (result)=>{
            this.subEngForUser=result;
            console.log(result)

           if (result==null){
               document.getElementById('recommended').style.visibility='hidden'
           }

            this.totalSubEng.push(
                       new Subject("הנדסת תוכנה",result.software),
                       new Subject("הנדסה כימית",result.chemistry),
                       new Subject("הנדסת אלקטרוניקה",result.electronic),
                       new Subject("הנדסה רפואית",result.medical),
                       new Subject("הנדסה תעשיה וניהול",result.management),
                       new Subject("הנדסת בניין/אזרחית",result.building),
                       new Subject("הנדסת מכונות",result.machine)
                            );
            this.totalSubEng.sort(function(a, b){return b.total - a.total})
            console.log(this.totalSubEng)
            this.threeSubEngRecommended.push(this.totalSubEng[0].type,this.totalSubEng[1].type,this.totalSubEng[2].type)
            // document.getElementById('recommended1').innerHTML=this.totalSubEng[0].type;
            //  document.getElementById('recommended2').innerHTML=this.totalSubEng[1].type;
            // document.getElementById('recommended3').innerHTML=this.totalSubEng[2].type;     
        })
    })
   
  }

}
