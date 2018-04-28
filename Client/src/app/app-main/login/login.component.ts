import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { CurrentUser } from '../../app-shared/current-user';
import { User } from '../../model/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

    response:string;
    user:User;

    @ViewChild('email') emailInputRef : ElementRef;
    @ViewChild('pass') passInputRef : ElementRef;

  constructor(private dataService : DataService,
              private router:Router , 
              private currentUserService:CurrentUser ) { }

  ngOnInit() {
  }

  login(){
           console.log(`login()->${this.emailInputRef.nativeElement.value},
                        ${this.passInputRef.nativeElement.value}`);

            this.dataService.login(this.emailInputRef.nativeElement.value,
            this.passInputRef.nativeElement.value,result=>{

              if(!isNaN(result)){
                let code = result;
                if(code==405){
                  this.response = "wrong password";
                  document.getElementById('res').innerHTML='הסיסמא אינה נכונה';
                } else if (code==500) {
                    this.response = "email not exists";
                  document.getElementById('res').innerHTML='אימייל לא קיים';
                } else {
                    this.response = "another issue";
                }
              }

              else if (result._id == '5ac3d84d86be841138bcaf1a'){
                let user = new User();
                user.setId(result._id);
                user.setFirstName(result.firstName);
                user.setEmail(result.email);
                user.setLastName(result.lastName);  
                user.setPassword(result.password);
                this.currentUserService.change(user);   
                this.dataService.myMethod(result); 
                this.router.navigateByUrl('/expert');            
              }

              else{
                let user = new User();
                user.setId(result._id);
                user.setFirstName(result.firstName);
                user.setEmail(result.email);
                user.setLastName(result.lastName);  
                user.setPassword(result.password);  
                this.currentUserService.change(user); 
                this.dataService.myMethod(result); 
                this.router.navigateByUrl('/enter');    

              }              

            })
        };
    }





