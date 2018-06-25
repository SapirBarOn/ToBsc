import { Injectable, EventEmitter } from '@angular/core';
import { Colleges } from '../model/Colleges.model';
import { Router } from '@angular/router';
import  { DataService } from '../data.service';

@Injectable()
export class CurrentColleges{

    currentColleges:Colleges ;
    allColleges:Colleges[]=[];

    constructor(private router:Router,
        private dataService : DataService){}

    setAllColleges(){
        this.dataService.getAllColleges((result) =>{
        this.allColleges=result;
        });
    }

    change(college:Colleges){
        this.currentColleges = college;
        console.log(this.currentColleges);
    }

    getCurrentColleges(){
        return this.currentColleges;
    }

    setliked(v : boolean){
        this.currentColleges.liked=v;
    }

    getliked(){
        return this.currentColleges.liked;
    }

    check(c){
        for(let i=0; i<this.allColleges.length; i++){
        console.log(this.allColleges.length);
        console.log(this.allColleges[i].hebName);

          if(this.allColleges[i].hebName == c) {
            console.log(this.allColleges[i].hebName);
            this.change(this.allColleges[i]);
            this.router.navigateByUrl('/intoCollege');
          }
        }
    }
}