import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../../app-shared/current-user';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    response:String;
    auth: FormGroup;
    @ViewChild('firstName') firstNameInputRef : ElementRef;
    @ViewChild('lastName') lastNameInputRef : ElementRef;
    @ViewChild('email') emailInputRef : ElementRef;
    @ViewChild('pass') passInputRef : ElementRef;
     @ViewChild('age') ageInputRef : ElementRef;

     WorkExperience: string[] = [
    'מכירות',
    'שיווק',
    'מלצרות',
    'ניהול'
  ]
    gender: string[] = [
    'זכר',
    'נקבה'
  ]
  constructor(private dataService : DataService,
              private router:Router,
              private currentUserService:CurrentUser,private modalService: NgbModal,
              private alertConfig: NgbAlertConfig) { }

  ngOnInit() {

    this.auth = new FormGroup({
       'WorkExperience': new FormControl(),
        'gender': new FormControl()
    });

  }

  createUser(post){
            console.log(`createUser()->
            ${this.firstNameInputRef.nativeElement.value},
            ${this.lastNameInputRef.nativeElement.value},
            ${this.emailInputRef.nativeElement.value},
            ${this.passInputRef.nativeElement.value},
            ${this.ageInputRef.nativeElement.value}`);

           this.dataService.createUser(this.firstNameInputRef.nativeElement.value,
               this.lastNameInputRef.nativeElement.value,
               this.emailInputRef.nativeElement.value,
               this.passInputRef.nativeElement.value,post.WorkExperience,post.gender,
               this.ageInputRef.nativeElement.value,result=>{

                if(result){
                    this.dataService.myMethod(result); 
                    this.currentUserService.change(result);
                    this.router.navigateByUrl('/enter');
                }
                else{
                    document.getElementById('res').innerHTML='ישנה שגיאה,אנא נסה שנית';
                }              

            })
        };
  }

