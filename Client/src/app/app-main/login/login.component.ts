import { Component, OnInit, ElementRef, ViewChild, EventEmitter, Output} from '@angular/core';
import  {DataService} from '../../data.service';
import { Router } from '@angular/router';
import { AppHeaderComponent } from '../../app-header/app-header.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

    public response:string;
    public test:string;
    @Output() userName= new EventEmitter<string>();
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
                this.response = result;
                if(result == 'password is wrong'){
                  document.getElementById('res').innerHTML='הסיסמא אינה נכונה';
                }
                else if (result[0] == '5ac3d84d86be841138bcaf1a'){
                    this.router.navigateByUrl('/expert');
                    this.dataService.myMethod(this.response);           
                }

                else{
                    this.router.navigateByUrl('/enter');
                    console.log('login response');
                    console.log(result);
                    this.dataService.myMethod(this.response);
                }              

            })
        };
    }





