import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Scholarships } from '../../model/Scholarships.model';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from '../../model/subject.model';
import { CurrentScholarships } from '../../app-shared/current-scholarship';
import { Router } from '@angular/router';
@Component({
  selector: 'app-scholarships',
  templateUrl: './scholarships.component.html',
  styleUrls: ['./scholarships.component.css']
})
export class ScholarshipsComponent implements OnInit {

scholarships:Scholarships[]=[];
myform: FormGroup;
cLocation:boolean=false;
cOrigin:boolean=false;
locations: string[] = [
    'מרכז',
    'שרון',
    'ירושלים',
    'דרום',
    'שומרון',
    'צפון'
  ]  

  origin: string[] = [
    'עיראק',
    'אתיופיה',
    'איראן',
    'רוסיה',
    'העדה הדרוזית',
    'העדה הערבית',
    'העדה החרדית',
    'תימן',
  ]
 
  choose: string[]=[
  'מיקום',
  'מוצא',
  'התנדבות',
  'חייל/ת משוחרר/ת',
  'חייל/ת מילואים',
  ]
  constructor(private dataService:DataService,
              private modalService: NgbModal,
              private alertConfig: NgbAlertConfig,
              private currentScholarshipsService:CurrentScholarships,
              private router:Router) { }

  ngOnInit() {
      this.dataService.getAllScholarships((result)=>{
          this.scholarships=result;
          console.log(this.scholarships);
      })

      this.myform = new FormGroup({
       'location': new FormControl(),
       'origin':new FormControl(),
       // 'volunteering':new FormControl(),
       // 'reservist':new FormControl(),
       // 'veteran':new FormControl(),
       'choose':new FormControl(),
    });


  }

  filter(post){
    if(post.choose=="מיקום"){
      this.cLocation=true;
      this.cOrigin=false;
      post.origin=null;
    }
    else if(post.choose=="מוצא"){
      this.cOrigin=true;
      this.cLocation=false;
      post.location=null;
    }
    else{
      post.origin=null;
      post.location=null;
      this.cOrigin=false;
      this.cLocation=false;
    }
    this.dataService.filterScholarships(post.choose, post.origin, post.location,
                      result=>{
                console.log(`response=${result}`);
                console.log(result);
                if(result) this.scholarships = result;
                else  console.log('filter error');           
            })
  };
 

   intoScholarships(s){
      this.currentScholarshipsService.change(s);
      console.log("intoScholarships-->");
      console.log(s);
      this.router.navigateByUrl('/intoScholarships');
  }

}
