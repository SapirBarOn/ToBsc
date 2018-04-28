export class User {
      private _id:string;
      private firstName:string;
      private lastName:string;
      private email:string;
      private password:string;
      private answers:number[]=[];

  constructor(){}

 
  public setId(v : string) {
      this._id = v;
  }

  public getId(){
      return this._id;
  }

  public setFirstName(v : string) {
    this.firstName = v;
  }

  public getFirstName(){
      return this.firstName;
  }


  public setLastName(v : string) {
    this.lastName = v;
  }

  public getLastName(){
      return this.lastName;
  }

  public setEmail(v : string) {
    this.email = v;
  }

  public getEmail(){
    return this.email;
  }

  public setPassword(v : string) {
    this.password = v;
  }

  public getPassword(){
    return this.password;
  }

  public setAnswers(s:number[])
  {
    for(let i=0;i<s.length;i++){
      this.answers[i]=s[i];
    }
  }

  public getAnswers(){
    return this.answers;
  }

}