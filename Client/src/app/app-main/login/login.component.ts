import { Component, OnInit , ElementRef , ViewChild } from '@angular/core';
import  { DataService } from '../../data.service';
import { Router } from '@angular/router';

import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailAnswer="";
  passAnswer="";
  result;

  constructor(private newService : DataService,
      private router:Router) { }

  ngOnInit() {

  }

    onSubmit(){

         this.newService.checkLogin( this.emailAnswer , this.passAnswer,(results) => {
         this.result = results;

         if (this.result=="true"){
             document.getElementById('res').innerHTML="ברוכים הבאים";
             this.router.navigateByUrl('/');

         }

         else if(this.result=="password not correct") document.getElementById('res').innerHTML="הסיסמא אינה נכונה. נסה שוב.";
     })
    }
}
