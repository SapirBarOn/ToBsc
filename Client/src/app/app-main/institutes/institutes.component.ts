import { Component, OnInit } from '@angular/core';
import  {DataService} from '../../data.service';
import  {Institutes} from '../../model/Institutes.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-institutes',
  templateUrl: './institutes.component.html',
  styleUrls: ['./institutes.component.css']
})
export class InstitutesComponent implements OnInit {

  institutes:Institutes[]=[];
  selectedLocation: string;
  selectedSubEng: string;
  selectedDorms:boolean = false;
  selectedUniSalary:boolean = false;
  selectedInstitute:string;
emailid:string;

  constructor(private dataService:DataService) { }

  ngOnInit() {

    this.dataService.getAllInstitutes((result) =>{
        this.institutes=result;
        console.log(this.institutes);      

    });
  }


   onClickSubmit(data) {
     this.emailid = data.emailid;
     console.log(`emailid= ${this.emailid}`);
   }

  filter(){

    this.dataService.filterInstitutes(this.selectedLocation,
    this.selectedSubEng,
    this.selectedDorms,
    this.selectedUniSalary,
    this.selectedInstitute,result=>{
                console.log(`response=${result}`);
                if(result) this.institutes = result;
                else  console.log('filter error');           
            })
  };


  selectLocation (event: any) {
    this.selectedLocation = event.target.value;
    console.log(this.selectedLocation);      
  }

  selectSubEng (event: any) {
    this.selectedSubEng = event.target.value;
    console.log(this.selectedSubEng); 
  }

  selectInstitute (event: any) {
    this.selectedInstitute = event.target.value;
    console.log(this.selectedInstitute);      
  }

  selectDorms(event: any){
    if(!this.selectedDorms) this.selectedDorms = event.target.value;
    else this.selectedDorms = false;
    console.log(this.selectedDorms);      
  }

  selectUniSalary(event: any){
    if(!this.selectedUniSalary) this.selectedUniSalary = event.target.value;
    else this.selectedUniSalary = false;
    console.log(this.selectedUniSalary);      
  }

}
