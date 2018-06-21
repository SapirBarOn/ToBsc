import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Departments } from '../../model/Departments.model';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { CurrentDepartments } from '../../app-shared/current-department';
import { Router } from '@angular/router';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments:Departments[]=[];

  constructor(private dataService:DataService,
              private modalService: NgbModal,
              private alertConfig: NgbAlertConfig,
              private currentDepartmentsService:CurrentDepartments,
              private router:Router) { }

  ngOnInit() {
        this.dataService.getAllDepartments((result) =>{
        this.departments=result;
        console.log( this.departments); 
    });
  }

  intoDepartments(d){
      this.currentDepartmentsService.change(d);
      console.log("intoDepartments-->");
      console.log(d);
      this.router.navigateByUrl('/intoDepartments');
  }

}


