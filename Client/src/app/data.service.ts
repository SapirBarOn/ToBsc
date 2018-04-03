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

loginUser(email:string,pass:string, callback:Function){
        console.log(`loginUser() ->user ${email}`);  
        this.http.post('http://localhost:3000/login',{'emailInput':email ,'password':pass})
        .subscribe(
            (res:Response)=>{
                //console.log(`res.status ->`+res.status);
                console.log(`loginUser(good) -> ${res}`);
                callback(res.json());
            },
            error => {
              let code = error.status;
              console.log(`loginUser(bad) -> ${error.status}`);
              callback(code);
              // if(code==405){
              //   alert("wrong password");
              // } else if (code==500) {
              //   alert("user not exists");
              // } else {
              //   alert("another issue");
              // }

              
            });
    }


  checkLogin(data: string, data2: string, callback: Function){
    let emailLogin=data,
        passLogin= data2;
    this.http.get('http://localhost:3000/checkingUser/'+emailLogin+'/'+passLogin)
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


  addUserToData(data: string, data2: string, data3: string, data4: string, data5: string ,  callback: Function){
    let emailLogin=data,
        passLogin= data2;
    this.http.get('http://localhost:3000/createNewAccount/'+emailLogin+'/'+passLogin)
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
