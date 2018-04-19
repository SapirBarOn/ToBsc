import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs';

import  {Question} from './model/Qustion.model';


@Injectable()
export class DataService {

  private questions:Question[]= [];

  myMethod$: Observable<any>;
  myAnswers$: Observable<any>;
  chemistryWeight$:Observable<any>;
  softwareWeight$: Observable<any>;
  electronicWeight$ : Observable<any>;
  medicalWeight$ : Observable<any>;
  managementWeight$ : Observable<any>;
  buildingWeight$ : Observable<any>;
  machineWeight$ : Observable<any>;

  // chemistryResult:number[]=[];
  // softwarResult:number[]=[];
  // electronicResult:number[]=[];
  // medicalResult:number[]=[];
  // managementResult:number[]=[];
  // buildingResult:number[]=[];
  // machineResult:number[]=[];

  firstNameUser: string;

  private myMethodSubject = new Subject<any>();
  private myAnswerSubject = new Subject<any>();
  private chemistryWeightSubject = new Subject<any>();
  private softwareWeightSubject = new Subject<any>();
  private electronicWeightSubject = new Subject<any>();
  private medicalWeightSubject = new Subject<any>();
  private managementWeightSubject = new Subject<any>();
  private buildingWeightSubject = new Subject<any>();
  private machineWeightSubject = new Subject<any>();


  constructor(private http: Http) { 
            this.myMethod$ = this.myMethodSubject.asObservable();
            this.myAnswers$ = this.myAnswerSubject.asObservable();
            this.chemistryWeight$ = this.chemistryWeightSubject.asObservable();
            this.softwareWeight$ = this.softwareWeightSubject.asObservable();
            this.electronicWeight$ = this.electronicWeightSubject.asObservable();
            this.medicalWeight$ = this.medicalWeightSubject.asObservable();
            this.managementWeight$ = this.managementWeightSubject.asObservable();
            this.buildingWeight$ = this.buildingWeightSubject.asObservable();
            this.machineWeight$ = this.machineWeightSubject.asObservable();

        }


   allUsers(callback: Function) {
      this.http.get('http://localhost:3000/getAllData')
      .subscribe(
          (res: Response ) => {
              callback( res.json() );
          }
       )
  }

  allQuestions(callback: Function) {
      this.http.get('http://localhost:3000/getAllQuestions')
      .subscribe(
          (res: Response ) => {
              callback( res.json() );
          },
          (error =>{
              console.log(error);
              callback(null);
          })
       );
  }
     myMethod(data) {
        console.log(data); // I have data! Let's return it so subscribers can use it!
        // we can do stuff with data if we want
        this.myMethodSubject.next(data);
     }

    myAnswers(data) {
        console.log(data); // I have data! Let's return it so subscribers can use it!
        // we can do stuff with data if we want
        this.myAnswerSubject.next(data);
     }

    // chemistryWeight(data){
    //    this.chemistryResult.push(data)
    //    this.chemistryWeightSubject.next(this.chemistryResult);
    //  }

    //  softwareWeight(data){
    //    this.softwarResult.push(data)
    //    this.softwareWeightSubject.next(this.softwarResult);
    //  }

    //   electronicWeight(data){
    //    this.electronicResult.push(data)
    //    this.electronicWeightSubject.next(this.electronicResult);
    //  }

    //   medicalWeight(data){
    //    this.medicalResult.push(data)
    //    this.medicalWeightSubject.next(this.medicalResult);
    //  }
    //   managementWeight(data){
    //    this.managementResult.push(data)
    //    this.managementWeightSubject.next(this.managementResult);
    //  }
    //   buildingWeight(data){
    //    this.buildingResult.push(data)
    //    this.buildingWeightSubject.next(this.buildingResult);
    //  }
    //   machineWeight(data){
    //    this.machineResult.push(data)
    //    this.machineWeightSubject.next(this.machineResult);
    //  }


  login(email:string,password:string,callback: Function) {
      this.http.post('http://localhost:3000/login',{'email':email,'password':password})
      .subscribe(
          (res: Response ) => {
              callback(res.json());
          },
          (error => {
            console.log(error);
            callback(null);
        })
       );

  }

//  getUserName(){
//     return userName;
//  }

  createUser(firstName:string,lastName:string,email:string,password:string,callback: Function){
           this.http.post('http://localhost:3000/createNewAccount',
           {'firstName':firstName,'lastName':lastName,'email':email,'password':password})
              .subscribe(
                  (res: Response ) => {
                      callback( res.json() );
                  },
                  (error => {
                    console.log(error);
                    callback(null);
                })
               );
    }

    getQuestionById(data:number, callback:Function){
      let idNum=data;
      this.http.get('http://localhost:3000/getQuestion/'+idNum)
     .subscribe(
            (response: Response) =>  {
              console.log(response.json());
              callback(response.json());
            },
            (error => {
              console.log(error);
              callback(null);
            })
          );
        }


      getWeightsById(data:number, callback:Function){
        let idQus=data;
         this.http.get('http://localhost:3000/getWeights/'+idQus)
        .subscribe(
               (response: Response) =>  {
                  console.log(response.json());
                  callback(response.json());
                },
                (error => {
                  console.log(error);
                  callback(null);
                })
              );
    }

    calculateAndSaveSubEng( userId: string, dataAns: number[]
      ,softwareArr: number[],
      chemistryArr:number[],
      electronicArr:number[],
      medicalArr:number[],
      managementArr:number[],
      buildingArr:number[],
      machineArr:number[],
       callback: Function){
     
       this.http.get('http://localhost:3000/calculateSubEngByUser/'+userId+'/'+dataAns+'/'+softwareArr+'/'+chemistryArr+'/'+electronicArr+'/'+medicalArr+'/'+managementArr+'/'+buildingArr+'/'+machineArr)
        .subscribe(
               (response: Response) =>  {
                  console.log(response.json());
                  callback(response.json());
                },
                (error => {
                  console.log(error);
                  callback(null);
                })
              );
    }



     createQuestion(questionId:number,
                   question:string,
                   Wchemistry:number,
                   Wsoftware:number,
                   Welectronic:number,
                   Wmedical:number,
                   Wmanagement:number,
                   Wbuilding:number,
                   Wmachine:number,
                   callback: Function){
                this.http.post('http://localhost:3000/createNewQuestion',
                     {'questionId':questionId,'questionData':question,'Wchemistry':Wchemistry,'Wsoftware':Wsoftware,
                     'Welectronic':Welectronic,'Wmedical':Wmedical,'Wmanagement':Wmanagement,'Wbuilding':Wbuilding,'Wmachine':Wmachine})
                  .subscribe(
                  (res: Response ) => {
                      callback( res.json() );
                  },
                  (error => {
                    console.log(error);
                    callback(null);
                })
               );

    }




    updateQuestion(questionId:number,
                   questionData:string,
                   Wchemistry:number,
                   Wsoftware:number,
                   Welectronic:number,
                   Wmedical:number,
                   Wmanagement:number,
                   Wbuilding:number,
                   Wmachine:number,callback: Function){
      this.http.post('http://localhost:3000/updateQuestion',
      {'questionId':questionId,'questionData':questionData,
       'Wchemistry':Wchemistry,'Wsoftware':Wsoftware,
       'Welectronic':Welectronic,'Wmedical':Wmedical,
       'Wmanagement':Wmanagement,'Wbuilding':Wbuilding,'Wmachine':Wmachine})
      .subscribe(
          (res: Response ) => {
              callback(res.json());
          },
          (error => {
            console.log(error);
            callback(null);
        })
       );   
    
    }

    getCrawler(callback: Function) {
      this.http.get('http://localhost:3000/getCrawler')
      .subscribe(
          (res: Response ) => {
              callback( res.json() );
          },
          (error =>{
              console.log(error);
              callback(null);
          })
       );
  }

}
