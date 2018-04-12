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
    result:string;
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

  constructor(private dataService : DataService) { }

  ngOnInit() {
        this.softwareArr = new Array();
        this.chemistryArr= new Array();
        this.electronicArr= new Array();
        this.medicalArr= new Array();

        this.dataService.myMethod$.subscribe((data) => {
            this.userId = data[0]; 
            console.log(`userID= ${this.userId}`);
            }
        );


        this.dataService.myAnswers$.subscribe((data) => {
            this.userAns = data; 
            console.log(`answersUser= ${this.userAns}`);
            }
        );

       for(let id=1; id<13; id++){
             this.dataService.getWeightsById(id,(data)=>{
                 console.log(data);
                 console.log(data[0]);
                 this.softwareArr.push(data[0]);
                 this.chemistryArr.push(data[1]);
                 this.electronicArr.push(data[2]);
                 this.medicalArr.push(data[3]);

                 console.log(`softwareArr[]=${this.softwareArr}`);
                 console.log(`electronicArr[]=${this.electronicArr}`);
             // this.chemistryArr.push(data[1]);
             // this.electronicArr.push(data[2]);
             // this.medicalArr.push(data[3]);
             // this.managementArr.push(data[4]);
             // this.buildingArr.push(data[5]);
             // this.machineArr.push(data[6]);
             });

        }
            console.log(`softwareArr$$$$$=${this.softwareArr}`);

    }
}