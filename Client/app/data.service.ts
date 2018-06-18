import { Injectable } from '@angular/core';
import { Http , Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs';
import { Question } from './model/Qustion.model';


@Injectable()
export class DataService {

  private questions:Question[]= [];

  myMethod$: Observable<any>;
  myAnswers$: Observable<any>;

  private myMethodSubject = new Subject<any>();
  private myAnswerSubject = new Subject<any>();


  constructor(private http: Http) { 
    this.myMethod$ = this.myMethodSubject.asObservable();
    this.myAnswers$ = this.myAnswerSubject.asObservable();
  }

  myMethod(data) {
    console.log(data); 
    this.myMethodSubject.next(data);
  }

  myAnswers(data) {
    console.log(data); 
    this.myAnswerSubject.next(data);
  }

  allUsers(callback: Function) {
    this.http.get('https://tobsc-ws.herokuapp.com/getAllData')
    .subscribe(
      (res: Response ) => {
          callback( res.json() );
      }
    )
  }

  allQuestions(callback: Function) {
    this.http.get('https://tobsc-ws.herokuapp.com/getAllQuestions')
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


  getAllInstitutes(callback: Function) {
    this.http.get('https://tobsc-ws.herokuapp.com/getAllInstitutes')
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



  login(email:string,password:string,callback: Function) {
    this.http.post('https://tobsc-ws.herokuapp.com/login',{'email':email,'password':password})
    .subscribe(
      (res: Response ) => {
        callback(res.json());
      },
      (error => {
        let code = error.status;
        console.log(`loginUser(bad) -> ${error.status}`);
        callback(code);
      })
    );
  }


  createUser(firstName:string,lastName:string,email:string,password:string,WorkExperience:string,gender:string,age:number,callback: Function){
    this.http.post('http://localhost:3000/createNewAccount',
    {'firstName':firstName,'lastName':lastName,'email':email,'password':password,'WorkExperience':WorkExperience,'gender':gender,'age':age})
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

  getSubEngByUserId(userID:string,callback: Function){
    this.http.post('http://localhost:3000/getUserSubEngById',
    {'userID':userID})
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
    this.http.get('https://tobsc-ws.herokuapp.com/getQuestion/'+idNum)
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

getORcreateSubEngByUser(userID:string,callback: Function){
    this.http.post('http://localhost:3000/createSubEngByUserOrReturn',
    {'userID':userID})
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

  calculateAndSaveSubEng(userId: string,
                         dataAns: number[],
                         softwareArr: number[],
                         chemistryArr:number[],
                         electronicArr:number[],
                         medicalArr:number[],
                         managementArr:number[],
                         buildingArr:number[],
                         machineArr:number[],callback: Function){
    this.http.get('https://tobsc-ws.herokuapp.com/calculateSubEngByUser/'+userId+'/'+dataAns+'/'+softwareArr+'/'+chemistryArr+'/'+electronicArr+'/'+medicalArr+'/'+managementArr+'/'+buildingArr+'/'+machineArr)
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

updateSubEngWeights(userID:string,chemistry:number,
    software:number,
    electronic:number,
    medical:number,
    management:number,
    building:number,
    machine:number,callback: Function){
    this.http.post('http://localhost:3000/updateSubEngWeights',
    {'userID':userID,'chemistry':chemistry,'software':software,'electronic':electronic,
    'medical':medical,'management':management,'building':building,'machine':machine})
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
    this.http.post('https://tobsc-ws.herokuapp.com/createNewQuestion',
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
    this.http.post('https://tobsc-ws.herokuapp.com/updateQuestion',
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


  deleteQuestion(questionId:number,callback: Function){
    this.http.post('https://tobsc-ws.herokuapp.com/deleteQuestion',{'questionId':questionId})
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


  filterColleges(location:string,
                   subEng:string,
                   dorms:string,
                   uniSalary:string,
                   institute:string,callback: Function){
    this.http.post('https://tobsc-ws.herokuapp.com/filterColleges',
    {'location':location,'subEng':subEng,'dorms':dorms,
    'uniSalary':uniSalary,'institute':institute})
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

   getAllSubEng(callback: Function) {
    this.http.get('https://tobsc-ws.herokuapp.com/getAllSubEng')
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

  forgotPassword(email:string,callback: Function) {
      this.http.post('https://tobsc-ws.herokuapp.com/forgotPassword',{'email':email})
      .subscribe(
        (res: Response ) => {
          callback(res.json());
        },
        (error => {
          let code = error.status;
          console.log(`loginUser(bad) -> ${error.status}`);
          callback(code);
        })
      );
    }

   getAllDepartments(callback: Function) {
    this.http.get('https://tobsc-ws.herokuapp.com/getAllDepartments')
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

 getAllColleges(callback: Function) {
    this.http.get('https://tobsc-ws.herokuapp.com/getAllColleges')
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