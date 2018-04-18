
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

  constructor(questionId:number,questionData: string,Wchemistry: number,Wsoftware: number,
      Welectronic: number,Wmedical: number,Wmanagement: number,Wbuilding: number,Wmachine: number){
    this.questionId = questionId;
    this.questionData=questionData;
    this.Wchemistry=Wchemistry;
    this.Welectronic=Welectronic;
    this.Wmachine=Wmachine;
    this.Wmanagement=Wmanagement;
    this.Wmedical=Wmedical;
    this.Wsoftware=Wsoftware;
    this.Wbuilding=Wbuilding;
  }
}




