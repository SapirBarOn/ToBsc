import { Injectable } from '@angular/core';
import { Http , Response} from '@angular/http';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

   allUsers(callback: Function) {
      this.http.get('http://localhost:3000/getAllData')
      .subscribe(
          (res: Response ) => {
              callback( res.json() );
          }
       )
  }

  login(email:string,password:string,callback: Function) {
      this.http.post('http://localhost:3000/login',{'email':email,'password':password})
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


}
