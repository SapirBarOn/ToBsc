import { Component, OnInit } from '@angular/core';
import { Departments } from '../../../model/Departments.model';
import { CurrentDepartments } from '../../../app-shared/current-department';
import { DataService } from '../../../data.service';
import { Colleges } from '../../../model/Colleges.model';
import {CurrentColleges} from './../../../app-shared/current-college';


@Component({
  selector: 'app-into-departments',
  templateUrl: './into-departments.component.html',
  styleUrls: ['./into-departments.component.css']
})
export class IntoDepartmentsComponent implements OnInit {

  Departments:Departments ;
  nameSunEng:string;
  arraySubEng:string[]=[];
  constructor(private currentDepartmentsService:CurrentDepartments,
              private dataService:DataService,
              private CurrentCollegesService:CurrentColleges) { }

  ngOnInit() {
      this.Departments = this.currentDepartmentsService.getCurrentDepartments();
      console.log("ngOnInit->intoDepartments");
      console.log(this.Departments);
      this.nameSunEng=this.Departments.hebName;
      if (this.nameSunEng=="הנדסה אזרחית / הנדסת בניין"){
        this.nameSunEng="הנדסת בניין";
      }
      console.log(this.nameSunEng);
      this.dataService.getAllColleges((result)=>{
        console.log(result);
        for(let i=0;i<result.length;i++){
           console.log(result[i].subEng);
           if(result[i].subEng.includes(this.nameSunEng)){
            console.log(result[i].hebName);
            this.arraySubEng.push(result[i].hebName);
           }
        }
        console.log(this.arraySubEng);
        // document.getElementById('subEng').innerHTML= this.arraySubEng.join();
      });
      this.CurrentCollegesService.setAllColleges();
  }
  goBack() {
    window.history.back();
}
openColleges(c){
    console.log("openColleges!!!!!!!!!!!!!!!!");
    console.log(c);
    this.CurrentCollegesService.check(c);
  }

}
