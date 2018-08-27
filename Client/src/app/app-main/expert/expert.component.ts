import { Component, OnInit , Input} from '@angular/core';
import  {DataService} from '../../data.service';
import  {Question} from '../../model/Qustion.model';
import { Router } from '@angular/router';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {

    typeExpert:string[]=[
    "משתמשים",
    "קרולר",
    "שאלות"
    ]


  constructor(private router:Router) { }

  ngOnInit() {

   };

    goBack() {
    window.history.back();
  }


   intoTypeExpert(t){
     if (t=="שאלות"){
        this.router.navigateByUrl('/expert-questions');
     }

     if (t=="קרולר") {
       this.router.navigateByUrl('/expert-crawler');
     }

     if (t=="משתמשים") {
       // code...
     }

   }

}



