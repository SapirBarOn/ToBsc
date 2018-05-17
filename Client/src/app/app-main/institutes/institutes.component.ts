import { Component, OnInit } from '@angular/core';
import  {DataService} from '../../data.service';
import  {Institutes} from '../../model/Institutes.model';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.css']
})
export class InstitutesComponent implements OnInit {

  institutes:Institutes[]=[];
  myform: FormGroup;

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
              private fb: FormBuilder) { }

  ngOnInit() {

    this.dataService.getAllInstitutes((result) =>{
        this.institutes=result;
        console.log(this.institutes);      

    });


    this.myform = new FormGroup({
       'location': new FormControl(),
       'subEng':new FormControl(),
       'institute':new FormControl(),
       'salary':new FormControl(),
       'dorms':new FormControl()
    });

  }


  filter(post){
    console.log('filter');
        console.log(post.location);
        console.log(post.subEng);
        console.log(post.dorms);
        console.log(post.salary);
        console.log(post.institute);

    this.dataService.filterInstitutes(post.location,
    post.subEng,
    post.dorms,
    post.salary,
    post.institute,result=>{
                console.log(`response=${result}`);
                if(result) this.institutes = result;
                else  console.log('filter error');           
            })
  };
  
}
