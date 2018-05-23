import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Colleges } from '../../model/Colleges.model';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {


  colleges:Colleges[]=[];
  myform: FormGroup;
  cChoosed:Colleges;

  locations: string[] = [
    'מרכז',
    'שרון',
    'ירושלים',
    'דרום',
    'שומרון',
    'צפון'
  ]  

  institute: string[] = [
    'אוניברסיטה',
    'מכללה'
  ]
  
  subEngs: string[] = [
    'הנדסת כימיה',
    'הנדסת תוכנה',
    'הנדסת אלקטרוניקה',
    'הנדסת מכונות',
    'הנדסת בניין',
    'הנדסת תעשייה וניהול',
    'הנדסה רפואית'
  ]  

  salary: string[] = [
    'שכ"ל אוניברסיטאי',
    'ללא שכ"ל אוניברסיטאי'
  ]

  dorms: string[] = [
    'קיום מעונות',
    'ללא מעונות'
  ]



  constructor(private dataService:DataService,
              private modalService: NgbModal,
              private alertConfig: NgbAlertConfig) { }

  ngOnInit() {
     
    this.dataService.getAllColleges((result) =>{
        this.colleges=result;
        console.log(this.colleges);      

    });


    this.myform = new FormGroup({
       'location': new FormControl(),
       'subEng':new FormControl(),
       'institute':new FormControl(),
       'salary':new FormControl(),
       'dorms':new FormControl()
    });


  }

  openMap(content) {
    this.alertConfig.dismissible = false;
    this.modalService.open(content,{ centered: true });
  }


  filter(post){
    this.dataService.filterColleges(post.location,
                        post.subEng,
                        post.dorms,
                        post.salary,
                        post.institute,result=>{
                console.log(`response=${result}`);
                if(result) this.colleges = result;
                else  console.log('filter error');           
            })
  };


  openInfo(content,c) {
    this.cChoosed=c;
    this.alertConfig.dismissible = false;
    this.modalService.open(content,{ centered: true });
  }
}
