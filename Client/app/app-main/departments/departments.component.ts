import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Departments } from '../../model/Departments.model';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments:Departments[]=[];
  dChoosed:Departments;

  constructor(private dataService:DataService,
              private modalService: NgbModal,
              private alertConfig: NgbAlertConfig) { }

  ngOnInit() {

        this.dataService.getAllDepartments((result) =>{
        this.departments=result;
        console.log( this.departments);      
    });
  }


  openInfo(content,d) {
    this.alertConfig.dismissible = false;
    this.dChoosed=d;
    console.log(this.dChoosed);
    this.modalService.open(content,{ centered: true });
  }

}


