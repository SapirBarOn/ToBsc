export class User {
      private _id:string;
      private firstName:string;
      private lastName:string;
      private email:string;
      private password:string;
      private answers:number[]=[];
  // constructor(
      // public _id:string,
      // public name:string,
  //     public password:string,
  //     public email:string,
  //     public env:[string],
  //     public instr:[string],
  //     public era:[string]) {}

  constructor(){

  }

 
  public setId(v : string) {
      this._id = v;
  }

    public setFirstName(v : string) {
      this.firstName = v;
  }

  public getId(){
      return this._id;
  }
    public getFirstName(){
      return this.firstName;
  }

   public setPassword(v : string) {
      this.password = v;
  }

  public getPassword(){
      return this.password;
  }

  public setEmail(v : string) {
      this.email = v;
  }

  public getEmail(){
      return this.email;
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

//   public setInstr(v : String[]) {
//       this.instr = v;
//   }

//   public getInstr(){
//       return this.instr;
//   }

//   public setEra(v : String[]) {
//       this.era = v;
//   }

//   public getEra(){
//       return this.era;
//   }
}