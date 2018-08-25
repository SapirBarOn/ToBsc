import { Component, OnInit } from '@angular/core';
import {CurrentUser} from '../../app-shared/current-user';
import { User } from '../../model/user.model';
import { DataService } from '../../data.service';
import {SubEngByUser} from'../../model/SubEngByUser.model';
import {CurrentDepartments} from '../../app-shared/current-department';
import { Departments } from '../../model/Departments.model';
import { Subject } from '../../model/subject.model';

@Component({
  selector: 'app-my-sub-eng',
  templateUrl: './my-sub-eng.component.html',
  styleUrls: ['./my-sub-eng.component.css']
})
export class MySubEngComponent implements OnInit {
user:User;
id:string;
mySubEng:Subject[]=[];
threeMySubEng:string[]=[];
  constructor(private dataService : DataService,
              private currentUserService : CurrentUser,
              private CurrentDepartmentsService:CurrentDepartments) { }

  ngOnInit() {
      this.CurrentDepartmentsService.setAllDepartments();
      this.user=this.currentUserService.getCurrentUser();
      if(this.user!=undefined){
          this.id=this.user.getId();
       }
      this.dataService.getSubEngByUserId(this.id,(result)=>{
      console.log(result);
      this.mySubEng.push(
              new Subject("הנדסת תוכנה",result.software),
              new Subject("הנדסה כימית",result.chemistry),
              new Subject("הנדסת אלקטרוניקה",result.electronic),
              new Subject("הנדסה רפואית",result.medical),
              new Subject("הנדסת תעשייה וניהול",result.management),
              new Subject("הנדסה אזרחית / הנדסת בניין",result.building),
              new Subject("הנדסת מכונות",result.machine)
                                );
            this.mySubEng.sort(function(a, b){return b.total - a.total})
              console.log("Total:",this.mySubEng);
            this.threeMySubEng.push(
              this.mySubEng[0].type,
              this.mySubEng[1].type,
              this.mySubEng[2].type
            );
        });
  }
openDepartment(d){
    console.log("openDepartment!!!!!!!!!!!!!!!!");
    console.log(d);
    // this.departments= this.CurrentDepartmentsService.getAllDepartments();
    // console.log(this.departments);
    this.CurrentDepartmentsService.check(d);
  }
}
