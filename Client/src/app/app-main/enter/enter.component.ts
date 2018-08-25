import { Component, OnInit } from '@angular/core';
import {CurrentUser} from '../../app-shared/current-user';
import { User } from '../../model/user.model';
// import { LikedByUser } from '../../model/LikedByUser.model';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { Subject } from '../../model/subject.model';
import {SubEngByUser} from'../../model/SubEngByUser.model';
import {CurrentDepartments} from '../../app-shared/current-department';
import {CurrentColleges} from '../../app-shared/current-college';
import { Departments } from '../../model/Departments.model';

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
flag:number=0;
threeSubEngRecommended:string[]=[];
departments:Departments[]=[];
favoriteColleges:string[]=[];

  constructor(private dataService : DataService,
              private currentUserService : CurrentUser,
              private CurrentDepartmentsService:CurrentDepartments,
              private CurrentCollegesService:CurrentColleges,
              private router:Router) { }

  ngOnInit() {
        this.CurrentDepartmentsService.setAllDepartments();
        this.CurrentCollegesService.setAllColleges();

        // this.id='5ac35e2ee92c8230100e21c4' //    Testing Only
        // this.age=25
        // this.WorkExperience='שירות/תמיכת לקוחות'
        // this.gender='נקבה'
        //if(this.user!=undefined){
        this.user=this.currentUserService.getCurrentUser();
        if(this.user!=undefined){
          console.log('11')
                  this.id=this.user.getId();
        this.WorkExperience=this.user.getWorkExperience();
        this.gender=this.user.getGender();
        this.age=this.user.getAge();
        console.log(this.age,this.WorkExperience,this.gender)
         this.dataService.allUsers((result)=>{
            this.allUsers=result;
            console.log(result.length)
          for(let u=0; u<this.allUsers.length; u++){

            if (this.allUsers[u]._id==this.user._id){
              this.allUsers[u].similarity=0;
              u++;
            }
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

           this.allUsers.sort(function(a, b){return b.similarity - a.similarity})
           console.log(this.allUsers)
           
           this.getThreeSubEng();
           this.getfavorite();

        })
      }
      else{
        alert('עליך להתחבר למערכת.')
        this.router.navigateByUrl('/login')
      } 

    }
  

  getThreeSubEng(){
    this.dataService.getSubEngByUserId(this.allUsers[this.flag]._id , (result)=>{
                this.subEngForUser=result;
                console.log(this.subEngForUser)

      if(result==null){
        this.flag++;
        this.getThreeSubEng();
      }

      else{
            this.totalSubEng.push(
              new Subject("הנדסת תוכנה",result.software),
              new Subject("הנדסה כימית",result.chemistry),
              new Subject("הנדסת אלקטרוניקה",result.electronic),
              new Subject("הנדסה רפואית",result.medical),
              new Subject("הנדסת תעשייה וניהול",result.management),
              new Subject("הנדסה אזרחית / הנדסת בניין",result.building),
              new Subject("הנדסת מכונות",result.machine)
                                );
            this.totalSubEng.sort(function(a, b){return b.total - a.total})
              console.log("Total:",this.totalSubEng);
            this.threeSubEngRecommended.push(
              this.totalSubEng[0].type,
              this.totalSubEng[1].type,
              this.totalSubEng[2].type
            );
      }
    }) 
  }

  getfavorite(){
        this.dataService.getFavoriteUserId(this.user.getId(),result=>{
                console.log(`response=${result}`);
                if(result) {
                  this.favoriteColleges= result.liked;
                  console.log('this.favoriteColleges-->');
                  console.log(this.favoriteColleges);
                }
                else  console.log('error');           
            });
  }

  openDepartment(d){
    console.log("openDepartment!!!!!!!!!!!!!!!!");
    console.log(d);
    // this.departments= this.CurrentDepartmentsService.getAllDepartments();
    // console.log(this.departments);
    this.CurrentDepartmentsService.check(d);
  }

  openColleges(c){
    console.log("openColleges!!!!!!!!!!!!!!!!");
    console.log(c);
    this.CurrentCollegesService.check(c);
  }

}


