import { Component, OnInit ,EventEmitter, Input} from '@angular/core';
import  {DataService} from '../../data.service';
import { Router } from '@angular/router';
import {CurrentUser} from '../../app-shared/current-user';
import { User } from '../../model/user.model';
import { Subject } from '../../model/subject.model';
import { Question } from '../../model/Qustion.model';

@Component({
  selector: 'app-subEngByUser',
  templateUrl: './subEngByUser.component.html',
  styleUrls: ['./subEngByUser.component.css']
})
export class SubEngByUserComponent implements OnInit {
    userId:string;
    Data:number;
    result:number[];
    userAns:number[];
    user:User;
    questions:Question[]=[];
    totalSubEng:Subject[]=[];

    softwarResult:number[]=[];
    chemistryResult:number[]=[];
    electronicResult:number[]=[];
    medicalResult:number[]=[];
    managementResult:number[]=[];
    buildingResult:number[]=[];
    machineResult:number[]=[];


  constructor(private dataService : DataService,private currentUserService : CurrentUser) { }

  ngOnInit() {

      this.dataService.allQuestions((result)=>{
        this.questions=result;
        console.log(this.questions);
              for (let i=0;i<this.questions.length;i++){
          this.softwarResult.push(this.questions[i].Wsoftware);
          this.chemistryResult.push(this.questions[i].Wchemistry);
          this.electronicResult.push(this.questions[i].Welectronic);
          this.medicalResult.push(this.questions[i].Wmedical);
          this.managementResult.push(this.questions[i].Wmanagement);
          this.buildingResult.push(this.questions[i].Wbuilding);
          this.machineResult.push(this.questions[i].Wmachine);
      }

      console.log(this.softwarResult);
      console.log(this.chemistryResult);
      console.log(this.electronicResult);
      console.log(this.medicalResult);
      console.log(this.managementResult);
      console.log(this.buildingResult);
      console.log(this.machineResult);

      this.user = this.currentUserService.getCurrentUser();
      if (this.user){
         this.userId= this.user.getId();
         this.userAns=this.user.getAnswers();
         console.log(this.userId); 
         console.log("after",this.userAns)    
      }

            if (this.userId!=null && this.userAns!= null){
                this.dataService.calculateAndSaveSubEng(this.userId, 
                    this.userAns ,this.softwarResult,this.chemistryResult,this.electronicResult,this.medicalResult,this.managementResult,this.buildingResult,this.machineResult, (data)=>{
                    this.result=data;
                    console.log("server->",this.result)


                       this.totalSubEng.push(
                            new Subject("הנדסת תוכנה",this.result[0]),
                            new Subject("הנדסה כימית",this.result[1]),
                            new Subject("הנדסת אלקטרוניקה",this.result[2]),
                            new Subject("הנדסה רפואית",this.result[3]),
                            new Subject("הנדסה תעשיה וניהול",this.result[4]),
                            new Subject("הנדסת בניין/אזרחית",this.result[5]),
                            new Subject("הנדסת מכונות",this.result[6])
                        );

                         this.totalSubEng.sort(function(a, b){return b.total - a.total});
                         console.log(this.totalSubEng);
                        document.getElementById('oneTotal').innerHTML="עדיפות ראשונה  "+this.totalSubEng[0].type;
                        document.getElementById('twoTotal').innerHTML="עדיפות שנייה  "+this.totalSubEng[1].type;
                        document.getElementById('treeTotal').innerHTML="עדיפות שלישית "+this.totalSubEng[2].type;     
                })
            }  
      });

 }

            

}

