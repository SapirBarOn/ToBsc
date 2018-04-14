import { Component, OnInit ,EventEmitter, Input} from '@angular/core';
import  {DataService} from '../../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-eng',
  templateUrl: './sub-eng.component.html',
  styleUrls: ['./sub-eng.component.css']
})
export class SubEngComponent implements OnInit {

    userId:string;
    Data:number;
    result:number[];
    id:number=1;
    weightsSub:number[];
    userAns:number[];
    softwareArr:number[];
    chemistryArr: number[];
    electronicArr: number[];
    medicalArr: number[];
    managementArr: number[];
    buildingArr: number[];
    machineArr: number[];

    chemistryResult;
    softwarResult;
    electronicResult;
    medicalResult;
    managementResult;
    buildingResult;
    machineResult;

    
  constructor(private dataService : DataService) { }

  ngOnInit() {
        this.softwareArr = new Array();
        this.chemistryArr= new Array();
        this.electronicArr= new Array();
        this.medicalArr= new Array();
        this.managementArr= new Array();
        this.buildingArr= new Array();
        this.machineArr= new Array();

       for(let id=1; id<13; id++){
            this.dataService.getWeightsById(id,(data)=>{
                this.dataService.chemistryWeight(data[0]);
                this.dataService.softwareWeight(data[1]);
                this.dataService.electronicWeight(data[2]);
                this.dataService.medicalWeight(data[3]);
                this.dataService.managementWeight(data[4]);
                this.dataService.buildingWeight(data[5]);
                this.dataService.machineWeight(data[6]);
             });
       }

       this.result=[50,60,70,80,30];
       console.log(this.result);

            this.dataService.myMethod$.subscribe((data) => {
            this.userId = data[0]; 
            console.log(`userID= ${this.userId}`);
            // this.userAns=[1,2,1,2,1,2,1,2,1,2,1,2];
            //this.ngOnInit1(this.userId)
        }); 

 }
 ngOnInit1(userId){
     console.log(userId);
      this.dataService.myAnswers$.subscribe((data) => {
            this.userAns = data; 
            console.log(`answersUser= ${this.userAns}`);

            if (userId!=null && this.userAns!= null){
                this.dataService.calculateAndSaveSubEng(userId, 
                    this.userAns , (data)=>{
                    this.result=data;
                    console.log("server->",this.result)
                    });
            }  
       });
 }


 // totalResult(resultArr){
 //     // let totalSoftware=resultArr[0];
 //     // let totalChmisty=resultArr[1];
 //     // let max1=Math.max(totalSoftware,totalChmisty);
 //     // let total 
 // }

         // let num1=2;
        // let num2=3;
        // let num3=4;
        // let num4=1;
        // let num5=6;
        // let num6=8;
        // let num7=9;

        // let max1=Math.max(num1,num2);
        // let max2=Math.max(num3,num4);
        // let max3=Math.max(num5,num6);

        // let max4=Math.max(num7,max1);
        // let max5=Math.max(max2,max3);

        // let max6=Math.max(max4,max5);    


}