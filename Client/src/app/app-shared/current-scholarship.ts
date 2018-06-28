import { Injectable, EventEmitter } from '@angular/core';
import { Scholarships } from '../model/Scholarships.model';
import { Router } from '@angular/router';
import  { DataService } from '../data.service';

@Injectable()
export class CurrentScholarships{

    currentScholarships:Scholarships;
    allScholarships:Scholarships[]=[];

    constructor(private router:Router,
        private dataService : DataService){}

    setAllScholarships(){
        this.dataService.getAllScholarships((result) =>{
        this.allScholarships=result;
        });
    }

    change(scholarships:Scholarships){
        this.currentScholarships = scholarships;
        console.log(this.currentScholarships);
    }

    getCurrentScholarships(){
        return this.currentScholarships;
    }

    check(s){
        for(let i=0; i<this.allScholarships.length; i++){
        console.log(this.allScholarships.length);
        console.log(this.allScholarships[i].name);

          if(this.allScholarships[i].name == s) {
            console.log(this.allScholarships[i].name);
            this.change(this.allScholarships[i]);
            this.router.navigateByUrl('/intoScholarships');
          }
        }
    }

}