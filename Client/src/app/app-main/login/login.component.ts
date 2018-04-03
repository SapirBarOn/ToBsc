import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import  {DataService} from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    response:String;

    @ViewChild('email') emailInputRef : ElementRef;
    @ViewChild('pass') passInputRef : ElementRef;

  constructor(private dataService : DataService,
  private router:Router ) { }

  ngOnInit() {
  }

  login(){
           console.log(`login()->${this.emailInputRef.nativeElement.value},${this.passInputRef.nativeElement.value}`);

           this.dataService.login(this.emailInputRef.nativeElement.value,
           this.passInputRef.nativeElement.value,result=>{
                let code = result;
                if (result == 'admin'){
                    this.router.navigateByUrl('/expert');            
                }
                if(result == 'succses'){
                    this.router.navigateByUrl('/enter');
                }
                else{
                    document.getElementById('res').innerHTML='אימייל או סיסמא אינם נכונים';
                }              

            })
        };
    }





