import { Component, OnInit } from '@angular/core';
import  {DataService} from '../../data.service';
import  {Institutes} from '../../model/Institutes.model';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.css']
})
export class InstitutesComponent implements OnInit {

  latShenkar: number = 32.0897947;
  lngShenkar: number = 34.8036642;

  latAfeka: number=32.122615;
  lngAfeka: number=34.806536;

  latTech: number=32.7767783;
  lngTech: number=35.0231271;

  latAriel: number=32.103188;
  lngAriel: number=35.207718;

  latHIT: number=32.0160931;
  lngHIT: number=34.7730563;

  latOrt: number=32.912914;
  lngOrt: number=35.281471;

  latBenG: number=32.912914;
  lngBenG: number=35.281471;


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
              private fb: FormBuilder,
              private modalService: NgbModal,
              private alertConfig: NgbAlertConfig) { }

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

  openMap(content) {
    this.alertConfig.dismissible = false;
    this.modalService.open(content,{ centered: true });
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