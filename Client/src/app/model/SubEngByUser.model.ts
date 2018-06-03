export class SubEngByUser {

    public userID:string;
    public software: number;
    public chemistry: number;
    public electronic:number;
    public medical: number;
    public management: number;
    public building: number;
    public machine: number;

  constructor(userID:string,software: number,chemistry: number,electronic:number,
      medical: number,management: number,building: number,machine: number){
    this.userID = userID;
    this.software=software;
    this.chemistry=chemistry;
    this.electronic = electronic;
    this.medical=medical;
    this.management=management;
    this.building=building;
    this.machine=machine;
  }
}