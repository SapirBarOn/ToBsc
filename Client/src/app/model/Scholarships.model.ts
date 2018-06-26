export class Scholarships {
    name:string;
    description:string;
    tel:string;
    dueDate:string;
    origin:string;
    location:string;
    volunteering:string;
    reservist:string;
    veteran:string;


  constructor(name: string,description:string,tel:string,dueDate:string, origin:string,location:string,
      volunteering:string,reservist:string,veteran:string){
    this.name = name;
    this.description=description;
    this.tel=tel;
    this.dueDate=dueDate;
    this.origin=origin;
    this.location=location;
    this.volunteering=volunteering;
    this.reservist=reservist;
    this.veteran=veteran;
  }
}