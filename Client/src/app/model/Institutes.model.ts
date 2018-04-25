export class Institutes {
    public name:string;
    public pic: string;
    public logo: string;
    public type:string;
    public location: string;
    public uniSalary: boolean;
    public dorms: boolean;
    public subEng: [string];

  constructor(name:string,pic: string,logo: string,type:string,location: string,
              uniSalary: boolean,dorms: boolean,subEng: [string]){
    this.name = name;
    this.pic=pic;
    this.logo=logo;
    this.type = type;
    this.location=location;
    this.uniSalary=uniSalary;
    this.dorms=dorms;
    this.subEng=subEng;
  }
}