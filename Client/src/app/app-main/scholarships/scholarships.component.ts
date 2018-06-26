import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Scholarships } from '../../model/Scholarships.model';
import { FormGroup ,FormControl ,FormBuilder } from '@angular/forms';
import { NgbModal , ModalDismissReasons ,NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from '../../model/subject.model';
@Component({
  selector: 'app-scholarships',
  templateUrl: './scholarships.component.html',
  styleUrls: ['./scholarships.component.css']
})
export class ScholarshipsComponent implements OnInit {

scholarships:Scholarships[]=[];
myform: FormGroup;

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
  
  volunteering: string[] = [
    'כן',
    'לא',
  ]  

  reservist: string[] = [
    'כן',
    'לא',
  ] 
  veteran: string[] = [
    'כן',
    'לא',
  ] 

  constructor(private dataService:DataService) { }

  ngOnInit() {
      this.dataService.getAllScholarships((result)=>{
          this.scholarships=result;
          console.log(this.scholarships);
      })

      this.myform = new FormGroup({
       'location': new FormControl(),
       'origin':new FormControl(),
       'volunteering':new FormControl(),
       'reservist':new FormControl(),
       'veteran':new FormControl()
    });


  }

  filter(post){
    this.dataService.filterScholarships(post.location,
                        post.origin,
                        post.volunteering,
                        post.reservist,
                        post.veteran,result=>{
                console.log(`response=${result}`);
                if(result) this.scholarships = result;
                else  console.log('filter error');           
            })
  };

}
