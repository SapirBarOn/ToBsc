export class Departments {
    public engName:string;
    public hebName: string;
    public description: string;
    public requirements:string;
    public subjects: string;
    public lowSalary: string;
    public highSalary: string;
    public logo: string;

  constructor(engName:string,hebName: string,description: string,requirements:string,
      subjects: string,lowSalary: string,highSalary: string,logo: string){
    this.engName = engName;
    this.hebName=hebName;
    this.description=description;
    this.requirements = requirements;
    this.subjects=subjects;
    this.lowSalary=lowSalary;
    this.highSalary=highSalary;
    this.logo=logo;
  }
}


