import { Component, OnInit } from '@angular/core';
import { Colleges } from '../../../model/Colleges.model';
import { CurrentColleges } from '../../../app-shared/current-college';

@Component({
  selector: 'app-into-college',
  templateUrl: './into-college.component.html',
  styleUrls: ['./into-college.component.css']
})
export class IntoCollegeComponent implements OnInit {

  College:Colleges ;

  constructor(private currentCollegeService:CurrentColleges) { }

  ngOnInit() {
      this.College = this.currentCollegeService.getCurrentColleges();
      console.log("ngOnInit->intoCollege");
      console.log(this.College);
  }

}
