import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { User } from '../../model/user.model';
import { Response, Headers } from '@angular/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

    response:string;

    @ViewChild('email') emailInputRef : ElementRef;

  constructor(private dataService : DataService) { }

  ngOnInit() {
  }

  forgotPassword(){
           console.log(`forgotPassword()->${this.emailInputRef.nativeElement.value}`);

            this.dataService.forgotPassword(this.emailInputRef.nativeElement.value,result=>{

              if(!isNaN(result)){
                let code = result;
                if (code==500) {
                    this.response = "email not exists";
                  document.getElementById('res').innerHTML='אימייל לא קיים';
                } else {
                    this.response = "another issue";
                }
              }
              
            })
        };

}