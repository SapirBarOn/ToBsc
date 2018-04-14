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
    userAns:number[];
    //totalSubEng:object[];

    softwarResult;
    chemistryResult;
    electronicResult;
    medicalResult;
    managementResult;
    buildingResult;
    machineResult;


  constructor(private dataService : DataService) { }

  ngOnInit() {
       // this.totalSubEng= new Array();

       for(let id=1; id<13; id++){
            this.dataService.getWeightsById(id,(data)=>{
                this.dataService.softwareWeight(data[0]);
                this.dataService.chemistryWeight(data[1]);
                this.dataService.electronicWeight(data[2]);
                this.dataService.medicalWeight(data[3]);
                this.dataService.managementWeight(data[4]);
                this.dataService.buildingWeight(data[5]);
                this.dataService.machineWeight(data[6]);
             });
       }

       //this.result=[50,60,70,80,30];


            this.dataService.myMethod$.subscribe((data) => {
            this.userId = data[0]; 
            console.log(`userID= ${this.userId}`);
            this.ngOnInit1(this.userId)
        }); 

 }
 ngOnInit1(userId){
     console.log(userId);
      // this.dataService.myAnswers$.subscribe((data) => {
      //       this.userAns = data; 
      //       console.log(`answersUser= ${this.userAns}`);
            this.userAns=[1,2,1,2,1,2,1,2,1,2,1,2];
            if (userId!=null && this.userAns!= null){
                this.dataService.calculateAndSaveSubEng(userId, 
                    this.userAns , (data)=>{
                    this.result=data;
                    console.log("server->",this.result)
                    this.totalResult(this.result);
                    });
            }  
    //   });
 }


  totalResult(resultArr){
   //  resultArr.sort(function(a, b){return b - a});
   // console.log(resultArr);    
   //  document.getElementById("oneTotal").innerHTML = 'One total:'+ this.result[0];
   //  document.getElementById("twoTotal").innerHTML = 'Two total:'+ this.result[1];
   //  document.getElementById("treeTotal").innerHTML = 'Tree total:'+ this.result[2];
   console.log(resultArr); 
   
//    $scope.items = {};
// $scope.items['color-1'] = {color: "red"};
// $scope.items['color-2'] = {color: "green"};
// $scope.items['color-3'] = {color: "blue"}

  //  let totalSubEng = [
  //   {type:"Software", total:resultArr[0]},
  //   {type:"Chemistry", total:resultArr[1]},
  //   {type:"Electronic", total:resultArr[2]},
  //   {type:"Medical", total:resultArr[3]},
  //   {type:"Management", total:resultArr[4]},
  //   {type:"Building", total:resultArr[5]},
  //   {type:"Machine", total:resultArr[6]}]


  //   console.log(totalSubEng);

  //   totalSubEng.sort(function(a, b){return b.total - a.total});

  // document.getElementById("resultsTotal").innerHTML =
  // totalSubEng[0].type + " " + totalSubEng[0].total + "<br>" +
  // totalSubEng[1].type + " " + totalSubEng[1].total + "<br>" +
  // totalSubEng[2].type + " " + totalSubEng[2].total;
 }



}