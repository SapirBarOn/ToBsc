import { Component, OnInit } from '@angular/core';
import { Departments } from '../../../model/Departments.model';
import { CurrentDepartments } from '../../../app-shared/current-department';

@Component({
  selector: 'app-into-departments',
  templateUrl: './into-departments.component.html',
  styleUrls: ['./into-departments.component.css']
})
export class IntoDepartmentsComponent implements OnInit {

  Departments:Departments ;

  constructor(private currentDepartmentsService:CurrentDepartments) { }

  ngOnInit() {
      this.Departments = this.currentDepartmentsService.getCurrentDepartments();
      console.log("ngOnInit->intoDepartments");
      console.log(this.Departments);
  }
  goBack() {
    window.history.back();
}

}
