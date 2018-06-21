import { Injectable, EventEmitter } from '@angular/core';
import { Departments } from '../model/Departments.model';
import { Router } from '@angular/router';
import  { DataService } from '../data.service';

@Injectable()
export class CurrentDepartments{

    currentDepartments:Departments ;
    allDepartments:Departments[]=[];

    constructor(private router:Router,
        private dataService : DataService){}

    setAllDepartments(){
        this.dataService.getAllDepartments((result) =>{
        this.allDepartments=result;
        });
    }

    change(departments:Departments){
        this.currentDepartments = departments;
        console.log(this.currentDepartments);
    }

    getCurrentDepartments(){
        return this.currentDepartments;
    }

    check(d){
        for(let i=0; i<this.allDepartments.length; i++){
        console.log(this.allDepartments.length);
        console.log(this.allDepartments[i].hebName);

          if(this.allDepartments[i].hebName == d) {
            console.log(this.allDepartments[i].hebName);
            this.change(this.allDepartments[i]);
            this.router.navigateByUrl('/intoDepartments');
          }
        }
    }

}