import { Injectable, EventEmitter } from '@angular/core';
import { Colleges } from '../model/Colleges.model';

@Injectable()
export class CurrentColleges{

    currentColleges:Colleges ;

    constructor(){}

    change(college:Colleges){
        this.currentColleges = college;
        console.log(this.currentColleges);
    }

    getCurrentColleges(){
        return this.currentColleges;
    }

}