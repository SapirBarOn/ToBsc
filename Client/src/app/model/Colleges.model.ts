export class Colleges {
    // public name:string;
    public pic: string;
    public logo: string;
    public type:string;
    public location: string;
    public uniSalary: boolean;
    public subEng: [string];
    public latitude:number;
    public longitude:number;
    // public dorms: boolean;

    public dorms: string;
    public engName: string;
    public reqUrl: string;
    public specialization: string;
    public description: string;
    public headline: string;
    public hebName: string;
    public address: string;
    public tuitionFee: string;
    public tel: string;
    public openday: string;
    public requirements: string;



  constructor(hebName:string,pic: string,logo: string,type:string,location: string,
              uniSalary: boolean,dorms: string,subEng: [string],latitude:number,longitude:number,
              engName: string,reqUrl:string,specialization:string,description:string,headline:string,
              address:string,tuitionFee:string,tel:string,openday:string,requirements:string){
    this.hebName = hebName;
    this.pic=pic;
    this.logo=logo;
    this.type = type;
    this.location=location;
    this.uniSalary=uniSalary;
    this.dorms=dorms;
    this.subEng=subEng;
    this.latitude=latitude;
    this.longitude=longitude;
    this.engName = engName;
    this.reqUrl=reqUrl;
    this.specialization=specialization;
    this.description = description;
    this.location=location;
    this.headline=headline;
    this.address=address;
    this.tuitionFee=tuitionFee;
    this.tel=tel;
    this.openday=openday;   
    this.requirements=requirements;
  }
}