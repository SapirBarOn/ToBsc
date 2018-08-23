import { Component, OnInit ,ElementRef, ViewChild} from '@angular/core';
import { CurrentUser } from '../../app-shared/current-user';
import { User } from '../../model/user.model';
import { DataService } from '../../data.service';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

    user:User;
    response:String;
    editing: FormGroup;
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

  userId:string;
  edit:boolean=false;

  constructor(private dataService : DataService,
              private router:Router,
              private currentUserService:CurrentUser,private modalService: NgbModal,
              private alertConfig: NgbAlertConfig) { }

  ngOnInit() {

        this.editing = new FormGroup({
       'WorkExperience': new FormControl(),
       'gender': new FormControl()
    });


       this.user=this.currentUserService.getCurrentUser();
       this.userId=this.user.getId();

    }

    saveEdit(post){
            console.log(`saveEdit()->
            ${this.userId},
            ${this.firstNameInputRef.nativeElement.value},
            ${this.lastNameInputRef.nativeElement.value},
            ${this.emailInputRef.nativeElement.value},
            ${this.ageInputRef.nativeElement.value}`);

      this.dataService.updateUser(this.userId,
               this.firstNameInputRef.nativeElement.value,
               this.lastNameInputRef.nativeElement.value,
               this.emailInputRef.nativeElement.value,
               post.WorkExperience,
               post.gender,
               this.ageInputRef.nativeElement.value,result=>{
        console.log(`response=${result}`);
        if(result == "edit saved"){
          // this.alertConfig.dismissible=true;
          // this.ngOnInit();
        this.cancelEdit();  
        }    
        else document.getElementById('res').innerHTML='ישנה בעיה, אנא נסה שנית';
      });
    }

    editingProfile(){
      console.log("editingProfile");
      this.edit=true;
    }

    cancelEdit(){
      console.log("cancelEdit");
      this.edit=false; 
    }
}