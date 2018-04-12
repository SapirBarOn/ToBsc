import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';
import {Subject} from 'rxjs/Subject';
import { Observable } from 'rxjs';

@Injectable()
export class DataService {

  myMethod$: Observable<any>;
  myAnswers$: Observable<any>;
  firstNameUser: string;
  private myMethodSubject = new Subject<any>();
   private myAnswerSubject = new Subject<any>();

  constructor(private http: Http) { 
            this.myMethod$ = this.myMethodSubject.asObservable();
            this.myAnswers$ = this.myAnswerSubject.asObservable();
        }


   allUsers(callback: Function) {
      this.http.get('http://localhost:3000/getAllData')
      .subscribe(
          (res: Response ) => {
              callback( res.json() );
          }
       )
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

    calculateAndSaveSubEng( userId: string, dataAns: number[], softtwareW: number[], chemistryW:number[],electronicW: number[], medicalhW:number[], managementW:number[], buildinghW:number[], machineW:number[], callback: Function){
       this.http.get('http://localhost:3000/calculateSubEngByUser/'+userId+'/'+dataAns+'/'+softtwareW+'/'+chemistryW+'/'+electronicW+'/'+medicalhW+'/'+managementW+'/'+buildinghW+'/'+machineW)
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

}
