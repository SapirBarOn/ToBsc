
export class Question {
    public questionId:number;
    public questionData: string;
    public Wchemistry: number;
    public Wsoftware: number;
    public Welectronic: number;
    public Wmedical: number;
    public Wmanagement: number;
    public Wbuilding: number;
    public Wmachine: number;
    public Wdifferent: number;
    public Marketing:number;
    public inexperienced:number;
    public Waitress:number;
    public Sales:number;
    public Management:number;
    public female:number;
    public male:number;
    public Age18To21:number;
    public Age22To25:number;
    public Age26To29:number;
    public up30:number;

  constructor(questionId:number,questionData: string,Wchemistry: number,Wsoftware: number,
      Welectronic: number,Wmedical: number,Wmanagement: number,Wbuilding: number,Wmachine: number , Wdifferent: number,
      Marketing:number,inexperienced:number,Waitress:number,Sales:number,Management:number,female:number,male:number,
      Age18To21:number,Age22To25:number,Age26To29:number,up30:number){
    this.questionId = questionId;
    this.questionData=questionData;
    this.Wchemistry=Wchemistry;
    this.Welectronic=Welectronic;
    this.Wmachine=Wmachine;
    this.Wmanagement=Wmanagement;
    this.Wmedical=Wmedical;
    this.Wsoftware=Wsoftware;
    this.Wbuilding=Wbuilding;
    this.Wdifferent=Wdifferent;
    this.Marketing=Marketing;
    this.inexperienced=inexperienced;
    this.Waitress=Waitress;
    this.Sales=Sales;
    this.Management=Management;
    this.female=female;
    this.male=male;
    this.Age18To21=Age18To21;
    this.Age22To25=Age22To25;
    this.Age26To29=Age26To29;
    this.up30=up30;
  }
}




