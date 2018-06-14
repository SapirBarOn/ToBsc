export class User {
      public _id:string;
      public firstName:string;
      public lastName:string;
      public email:string;
      private password:string;
      public answers:number[]=[];
      public age:number;
      public WorkExperience:string;
      public gender:string;
      public similarity:number;

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

  public setAge(a:number){
    this.age= a;
  }

  public getAge(){
    return this.age;
  }

  public setWorkExperience(w:string){
    this.WorkExperience=w;
  }

  public getWorkExperience(){
    return this.WorkExperience;
  }

  public setGender(g:string){
    this.gender=g;
  }

  public getGender(){
    return this.gender;
  }
  
  public setSimilarity(same:number){
    this.similarity=same;
  }

  public getSimilarity(){
    return this.similarity;
  }  
      
}